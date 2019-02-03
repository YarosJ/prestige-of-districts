import ReceiveFromQueue

consumer = ReceiveFromQueue()
consumer.consume_messages(lambda data: print(data))
