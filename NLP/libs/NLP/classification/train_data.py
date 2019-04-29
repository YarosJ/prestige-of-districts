#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals
import random
import operator
from typing import Dict

categories = {'FAULT': 0, 'INFO': 0, 'TOXIC': 0, 'REPAIR': 0}


def train_data(*args, coefficient: float = 20):
    categories_counts: Dict[str, float] = categories.copy()
    result = []

    for arr in args:
        for document in arr:
            categories_counts[document["categories"][0]] += 1

        print(categories_counts)
        min_cat_count: float = min(categories_counts.items(), key=operator.itemgetter(1))[1]

        for document in arr:
            result_cats: Dict[str, float] = categories.copy()
            cat = document["categories"][0]
            result_cats[cat] = coefficient * (min_cat_count / categories_counts[cat])

            result.append((document["text"], {
                "cats": result_cats
            }))

    random.shuffle(result)

    return result
