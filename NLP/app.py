import libs.rabbitMQ.Consumer as consumerModule
import libs.rabbitMQ.SendToQueue as sendToQueueModule
import libs.NLP.NER.get_entities as get_entities
import libs.NLP.classification.classify as classificator
import json

sender = sendToQueueModule.SendToQueue()
consumer = consumerModule.Consumer()


def main():
    consumer.consume_messages(entities)


def entities(data):
    text = data.decode("utf-8").replace('\\n', '\n')
    result_cats = classificator.classify(input_string=text)
    result_entities = get_entities.get_entities(input_string=text)
    result = {
        'text': text,
        'result_cats': result_cats,
        'result_entities': result_entities,
        'city': '',
        'country': '',
    }
    sender.send_message(json.dumps(result))


if __name__ == '__main__':
    main()
