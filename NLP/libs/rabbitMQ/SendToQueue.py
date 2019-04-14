import pika


class SendToQueue:
    def __init__(self, queue_name="nlp_output_queue", host_name="rabbitmq"):
        self.queue_name = queue_name
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host=host_name))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name, auto_delete=True, durable=True)

    def send_message(self, data):
        self.channel.basic_publish(exchange='',
                                   routing_key=self.queue_name,
                                   body=str(data),
                                   properties=pika.BasicProperties(
                                     delivery_mode=2,  # make message persistent
                                   ))

    def close_connection(self):
        self.connection.close()
