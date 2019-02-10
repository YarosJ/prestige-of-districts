# coding: utf8

#from __future__ import unicode_literals, print_function

import spacy

nlp = spacy.load('../TRAINED')

input = u"""


        . будет производиться хлорирование

        водопроводных сетей пос. sdfdsfsdfd.

         

        Использование питьевой воды

         с  8-00  до  19-00

        категорически  запрещается!

        Просим  Вас предостеречь несовершеннолетних детей.

        После окончания хлорирования воду перед употреблением  сливать!
        """

doc = nlp(input)

print(input)
print(doc.cats)
