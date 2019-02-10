#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals, print_function
import random


def train_data(*args):
    result = []
    for arr in args:
        for document in arr:
            entities = []
            for selection in document['selections']:
                entities.append((selection['selectionStart'], selection['selectionEnd'], selection['selectedType']))
            result.append((document["text"], {"entities": entities}))
    random.shuffle(result)
    return result
