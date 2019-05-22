[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/selector"](../modules/_controllers_graphql_resolvers_selector_.md)

# External module: "controllers/graphql/resolvers/selector"

## Index

### Interfaces

* [Selector](../interfaces/_controllers_graphql_resolvers_selector_.selector.md)

### Variables

* [pubSub](_controllers_graphql_resolvers_selector_.md#pubsub)

### Object literals

* [selectorResolver](_controllers_graphql_resolvers_selector_.md#selectorresolver)

---

## Variables

<a id="pubsub"></a>

### `<Const>` pubSub

**● pubSub**: *`PubSub`* =  new PubSub()

*Defined in [controllers/graphql/resolvers/selector.ts:4](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L4)*

___

## Object literals

<a id="selectorresolver"></a>

### `<Const>` selectorResolver

**selectorResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/selector.ts:16](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L16)*

Selector resolver. Returns selector depending on the input.

<a id="selectorresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/selector.ts:17](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L17)*

<a id="selectorresolver.query.selector-1"></a>

####  selector

▸ **selector**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Selector](../interfaces/_controllers_graphql_resolvers_selector_.selector.md)>

*Defined in [controllers/graphql/resolvers/selector.ts:23](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L23)*

Returns selector by given site URL and coordinates of element

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| URL | `any` |
| x | `any` |
| y | `any` |

**Returns:** `Promise`<[Selector](../interfaces/_controllers_graphql_resolvers_selector_.selector.md)>

___

___
<a id="selectorresolver.subscription"></a>

####  Subscription

**Subscription**: *`object`*

*Defined in [controllers/graphql/resolvers/selector.ts:38](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L38)*

<a id="selectorresolver.subscription.selectorreceived"></a>

####  selectorReceived

**selectorReceived**: *`object`*

*Defined in [controllers/graphql/resolvers/selector.ts:44](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L44)*

Subscription (uses websocket) because this operation can be too much long

<a id="selectorresolver.subscription.selectorreceived.subscribe"></a>

####  subscribe

▸ **subscribe**(): `AsyncIterator`<`symbol`>

*Defined in [controllers/graphql/resolvers/selector.ts:45](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/selector.ts#L45)*

**Returns:** `AsyncIterator`<`symbol`>

___

___

___

___

