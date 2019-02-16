#!/usr/bin/env python
# coding: utf8

from __future__ import unicode_literals, print_function
import random
from typing import Dict

categories = {'FAULT': 0, 'INFO': 0, 'TOXIC': 0, 'WATER': 0, 'ELECTRO': 0, 'REPAIR': 0}


def train_data(*args, coefficient: float = 1):
    categories_counts: Dict[str, float] = categories.copy()
    result = []
    for arr in args:
        total: float = len(arr)

        for document in arr:
            for cat in document["categories"]:
                categories_counts[cat] += 1

        for document in arr:
            result_cats = categories.copy()
            for cat in document["categories"]:
                result_cats[cat] = coefficient*total/categories_counts[cat]

            result.append((document["text"], {
                "cats": result_cats
            }))
    print(result)
    random.shuffle(result)
    return result
