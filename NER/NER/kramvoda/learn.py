#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals, print_function

import plac
import random
from pathlib import Path
import spacy
import xx_ent_wiki_sm
import json

TRAIN_DATA = []

config = json.loads(open('./kramvoda1.json').read())

for docum in config:
    ents = []
    for selection in docum['selections']:
        ents.append(( selection['selectionStart'], selection['selectionEnd'], selection['selectedType'] ))
    TRAIN_DATA.append((docum["text"], {"entities": ents}))

@plac.annotations(
    model=("Model name. Defaults to blank 'xx' model.", "option", "m", str),
    output_dir=("Optional output directory", "option", "o", Path),
    n_iter=("Number of training iterations", "option", "n", int))
def main(model=None, output_dir=None, n_iter=1):
    output_dir = "./"
    """Load the model, set up the pipeline and train the entity recognizer."""
    nlp = spacy.blank('xx')  # load existing spaCy model
    #print("Loaded model '%s'" % xx_ent_wiki_sm)

    # create the built-in pipeline components and add them to the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if 'ner' not in nlp.pipe_names:
        ner = nlp.create_pipe('ner')
        nlp.add_pipe(ner, last=True)
        print("'ner' not in nlp.pipe_names")
    # otherwise, get it so we can add labels
    else:
        ner = nlp.get_pipe('ner')

    # add label
    ner.add_label('LOC')

    # get names of other pipes to disable them during training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'ner']
    with nlp.disable_pipes(*other_pipes):  # only train NER
        optimizer = nlp.begin_training()
        for itn in range(n_iter):
            random.shuffle(TRAIN_DATA)
            losses = {}
            for text, annotations in TRAIN_DATA:
                nlp.update(
                    [text],  # batch of texts
                    [annotations],  # batch of annotations
                    drop=0.5,  # dropout - make it harder to memorise data
                    sgd=optimizer,  # callable to update weights
                    losses=losses)
            print(losses)

## END

    # test the trained model
    for text, _ in TRAIN_DATA:
        doc = nlp("Сообщаем, что в связи со снижением давления в водоводе технической воды фильтровальная станция будет остановлена сегодня 08.08.18 с 11:00 до 17:00.")
        print('Entities', [(ent, ent.label_) for ent in doc.ents])
        print('Tokens', [(t, t.ent_type_, t.ent_iob) for t in doc])

    # save model to output directory
    if output_dir is not None:
        output_dir = Path(output_dir)
        if not output_dir.exists():
            output_dir.mkdir()
        nlp.to_disk(output_dir)
        print("Saved model to", output_dir)

        # test the saved model
        print("Loading from", output_dir)
        nlp2 = spacy.load(output_dir)
        for text, _ in TRAIN_DATA:
            doc = nlp2(text)
            print('Entities', [(ent, ent.label_) for ent in doc.ents])
            print('Tokens', [(t, t.ent_type_, t.ent_iob) for t in doc])


if __name__ == '__main__':
    plac.call(main)
