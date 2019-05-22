[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/message"](../modules/_controllers_graphql_resolvers_message_.md)

# External module: "controllers/graphql/resolvers/message"

## Index

### Variables

* [debugMessages](_controllers_graphql_resolvers_message_.md#debugmessages)

### Object literals

* [messageResolver](_controllers_graphql_resolvers_message_.md#messageresolver)

---

## Variables

<a id="debugmessages"></a>

### `<Const>` debugMessages

**● debugMessages**: *`any`* =  debug('messagesController')

*Defined in [controllers/graphql/resolvers/message.ts:8](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L8)*

___

## Object literals

<a id="messageresolver"></a>

### `<Const>` messageResolver

**messageResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/message.ts:15](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L15)*

Messages resolver. Accepts input and converts it to commands for the messages model.

<a id="messageresolver.mutation"></a>

####  Mutation

**Mutation**: *`object`*

*Defined in [controllers/graphql/resolvers/message.ts:50](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L50)*

<a id="messageresolver.mutation.addmessage"></a>

####  addMessage

▸ **addMessage**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Message](../classes/_models_message_.message.md)>

*Defined in [controllers/graphql/resolvers/message.ts:56](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L56)*

Creates new message by given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| city | `any` |
| country | `any` |
| date | `any` |
| locations | `any` |
| service | `any` |
| text | `any` |

**Returns:** `Promise`<[Message](../classes/_models_message_.message.md)>

___
<a id="messageresolver.mutation.removemessage"></a>

####  removeMessage

▸ **removeMessage**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Message](../classes/_models_message_.message.md)>

*Defined in [controllers/graphql/resolvers/message.ts:77](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L77)*

Deletes message by id or another given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| date | `any` |
| id | `any` |
| latitude | `any` |
| locType | `any` |
| longitude | `any` |

**Returns:** `Promise`<[Message](../classes/_models_message_.message.md)>

___

___
<a id="messageresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/message.ts:16](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L16)*

<a id="messageresolver.query.messages"></a>

####  messages

▸ **messages**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Message](../classes/_models_message_.message.md)[]>

*Defined in [controllers/graphql/resolvers/message.ts:22](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/message.ts#L22)*

Returns messages filtered by given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| dateRange | `any` |
| latitude | `any` |
| locRange | `any` |
| locType | `any` |
| longitude | `any` |
| service | `any` |

**Returns:** `Promise`<[Message](../classes/_models_message_.message.md)[]>

___

___

___

