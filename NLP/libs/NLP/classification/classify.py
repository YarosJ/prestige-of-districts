#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals, print_function
import spacy


def classify(model_dir="./NLP/libs/NLP/classification/trained", input_string="Empty input string"):
    nlp = spacy.load(model_dir)
    doc = nlp(input_string)
    return doc.cats
