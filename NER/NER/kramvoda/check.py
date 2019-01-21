#!/usr/bin/env python
# encoding: utf-8

#from __future__ import unicode_literals, print_function

from pathlib import Path
import spacy
import sys

def main(output_dir="./NER/", input_string="Empty input string"):
        input_string = sys.stdin.readlines()[0]

        nlp2 = spacy.load(output_dir)
        doc = nlp2(input_string)

        print([(ent, ent.label_) for ent in doc.ents])

if __name__ == '__main__':
    main()
