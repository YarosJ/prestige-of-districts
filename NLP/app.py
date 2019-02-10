import libs.rabbitMQ.Consumer as consumerModule
import libs.rabbitMQ.SendToQueue as sendToQueueModule
import libs.NLP.NER.get_entities as get_entities

sender = sendToQueueModule.SendToQueue()
consumer = consumerModule.Consumer()


def main():
    consumer.consume_messages(entities)


def entities(data):
    text = data.decode("utf-8").replace('\\n', '\n')
    result_entities = get_entities.get_entities(input_string=text)
    sender.send_message(result_entities)


if __name__ == '__main__':
    main()
