# coding: utf8

#from __future__ import unicode_literals, print_function

import json

import spacy
nlp = spacy.load('xx')

train_data = []

# ---------------------------------

config = json.loads(open('../kramvoda1.json').read())

for docum in config:
    fault = 1.87 if docum["categories"][0] == "FAULT" else 0
    info = 1 if docum["categories"][0] == "INFO" else 0
    toxic = 4.61 if docum["categories"][0] == "TOXIC" else 0
    #print(fault, info, toxic)
    train_data.append((docum["text"], {"cats": {"FAULT": fault, "INFO": info, "TOXIC": toxic}}))

# ---------------------------------

textcat = nlp.create_pipe('textcat')
nlp.add_pipe(textcat, last=True)
textcat.add_label('FAULT')
textcat.add_label('INFO')
textcat.add_label('TOXIC')
optimizer = nlp.begin_training()
for itn in range(1): # 10
    for doc, gold in train_data:
        print gold
        nlp.update([doc], [gold], sgd=optimizer)

nlp.to_disk('../TRAINED')

print "END"

doc = nlp(u"По причине сокращения подачи воды КП «Компания «Вода Донбасса», фильтровальная станция 7.09.2018 продолжает работать по графику: с 05.00 - 10.00, 17.00 - 22.00. Аналогичный график работы будет осуществляться на выходные дни 8.09.2018 и 9.09.2018. Администрация КПП «КРАМАТОРСКИЙ ВОДОКАНАЛ» приносит извинения за временные неудобства,  просит произвести временный запас питьевой воды, а так же оплату долгов и текущих платежей. Городской администрацией принимаются все возможные меры в решении вопроса стабилизации водоснабжения города. Информация о режиме работы фильтровальной станции и графике подачи воды будет сообщена дополнительно. Администрация КПП «КРАМАТОРСКИЙ ВОДОКАНАЛ».")
print(doc.cats)
