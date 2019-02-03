import pika


class Consumer:
    def __init__(self, queue_name="nlp_queue", host_name="localhost"):
        self.queue_name = queue_name
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=host_name))
        self.channel = connection.channel()
        self.channel.queue_declare(queue=queue_name, durable=True)

    def consume_messages(self, callback):
        self.channel.basic_consume(lambda ch, method, properties, body: callback(body), queue=self.queue_name)
        self.channel.start_consuming()
