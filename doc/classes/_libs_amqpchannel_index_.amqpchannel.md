[prestige-of-districts](../README.md) > ["libs/AMQPChannel/index"](../modules/_libs_amqpchannel_index_.md) > [AMQPChannel](../classes/_libs_amqpchannel_index_.amqpchannel.md)

# Class: AMQPChannel

Establishes AMQP connection and make able to send and receive messages from queue with methods sendToQueue() and consume()

## Hierarchy

**AMQPChannel**

## Index

### Constructors

* [constructor](_libs_amqpchannel_index_.amqpchannel.md#constructor)

### Properties

* [channel](_libs_amqpchannel_index_.amqpchannel.md#channel)
* [host](_libs_amqpchannel_index_.amqpchannel.md#host)
* [queueName](_libs_amqpchannel_index_.amqpchannel.md#queuename)

### Methods

* [connect](_libs_amqpchannel_index_.amqpchannel.md#connect)
* [consume](_libs_amqpchannel_index_.amqpchannel.md#consume)
* [sendToQueue](_libs_amqpchannel_index_.amqpchannel.md#sendtoqueue)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AMQPChannel**(config: *`any`*): [AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)

*Defined in [libs/AMQPChannel/index.ts:14](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | `any` |

**Returns:** [AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)

___

## Properties

<a id="channel"></a>

### `<Protected>` channel

**● channel**: *`any`*

*Defined in [libs/AMQPChannel/index.ts:14](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L14)*

___
<a id="host"></a>

###  host

**● host**: *`string`*

*Defined in [libs/AMQPChannel/index.ts:12](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L12)*

___
<a id="queuename"></a>

###  queueName

**● queueName**: *`string`*

*Defined in [libs/AMQPChannel/index.ts:10](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L10)*

___

## Methods

<a id="connect"></a>

###  connect

▸ **connect**(): `Promise`<[AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)>

*Defined in [libs/AMQPChannel/index.ts:21](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L21)*

**Returns:** `Promise`<[AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)>

___
<a id="consume"></a>

###  consume

▸ **consume**(callback: *`any`*): [AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)

*Defined in [libs/AMQPChannel/index.ts:31](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `any` |

**Returns:** [AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)

___
<a id="sendtoqueue"></a>

###  sendToQueue

▸ **sendToQueue**(data: *`any`*): [AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)

*Defined in [libs/AMQPChannel/index.ts:39](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/AMQPChannel/index.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** [AMQPChannel](_libs_amqpchannel_index_.amqpchannel.md)

___

