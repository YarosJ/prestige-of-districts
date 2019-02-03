import libs.rabbitMQ.Consumer as consumerModule


def main():
    consumer = consumerModule.Consumer()
    consumer.consume_messages(lambda data: print(data.decode("utf-8")))


if __name__ == '__main__':
    main()
