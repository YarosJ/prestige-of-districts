#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals
import random
import operator
from typing import Dict

categories = {'FAULT': 0, 'INFO': 0, 'TOXIC': 0, 'WATER': 0, 'ELECTRO': 0, 'REPAIR': 0}


def train_data(*args, coefficient: float = 10):
    categories_counts: Dict[str, float] = categories.copy()
    result = []

    for arr in args:
        for document in arr:
            for cat in document["categories"]:
                categories_counts[cat] += 1

        print(categories_counts)
        min_cat_count: float = min(categories_counts.items(), key=operator.itemgetter(1))[1]

        for document in arr:
            result_cats: Dict[str, float] = categories.copy()
            for cat in document["categories"]:
                result_cats[cat] = coefficient * (min_cat_count / categories_counts[cat])

            result.append((document["text"], {
                "cats": result_cats
            }))

    random.shuffle(result)

    return result
