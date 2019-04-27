#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals, print_function

import spacy
import json
import plac
import random
from pathlib import Path
from train_data import train_data

config = json.loads(open('./corpuses/faults_classification_corpus.json').read())

TRAIN_DATA = train_data(config)
LABELS = ('FAULT', 'INFO', 'TOXIC', 'REPAIR')


@plac.annotations(
    output_dir=("Optional output directory", "option", "o", Path),
    n_iter=("Number of training iterations", "option", "n", int))
def main(output_dir="./trained/", n_iter=1):
    """Load the model, set up the pipeline and train the classificator."""
    nlp = spacy.blank('xx', disable=['ner'])

    # create the built-in pipeline components and add them to the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if 'textcat' not in nlp.pipe_names:
        textcat = nlp.create_pipe('textcat')
        nlp.add_pipe(textcat, last=True)
        print("'textcat' not in nlp.pipe_names")
    # otherwise, get it so we can add labels
    else:
        textcat = nlp.get_pipe('textcat')

    for lbl in LABELS:
        # add label
        textcat.add_label(lbl)
    nlp.vocab.vectors.name = 'spacy_classification_vectors'

    # get names of other pipes to disable them during training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'textcat']
    with nlp.disable_pipes(*other_pipes):  # only train textcat
        optimizer = nlp.begin_training()
        for itn in range(n_iter):
            random.shuffle(TRAIN_DATA)
            for doc, gold in TRAIN_DATA:
                nlp.update([doc], [gold], sgd=optimizer)

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
            print(doc, doc.cats)


if __name__ == '__main__':
    plac.call(main)
