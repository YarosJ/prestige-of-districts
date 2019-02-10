#!/usr/bin/env python
# encoding: utf-8

from __future__ import unicode_literals, print_function
import spacy


def get_entities(model_dir="./libs/NLP/NER/trained", input_string="Empty input string"):
        nlp = spacy.load(model_dir)
        doc = nlp(input_string)
        return [(ent, ent.label_) for ent in doc.ents]
