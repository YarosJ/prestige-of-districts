import libs.rabbitMQ.Consumer as consumerModule
import libs.NLP.NER.get_entities as get_entities


def main():
    consumer = consumerModule.Consumer()
    consumer.consume_messages(entities)


def entities(data):
    text = data.decode("utf-8").replace('\\n', '\n')
    result_entities = get_entities.get_entities(input_string=text)
    print(result_entities)  # Send result_entities to output queue


if __name__ == '__main__':
    main()
