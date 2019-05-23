[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/screenshot"](../modules/_controllers_graphql_resolvers_screenshot_.md)

# External module: "controllers/graphql/resolvers/screenshot"

## Index

### Interfaces

* [Screenshot](../interfaces/_controllers_graphql_resolvers_screenshot_.screenshot.md)

### Variables

* [pubSub](_controllers_graphql_resolvers_screenshot_.md#pubsub)

### Object literals

* [screenshotResolver](_controllers_graphql_resolvers_screenshot_.md#screenshotresolver)

---

## Variables

<a id="pubsub"></a>

### `<Const>` pubSub

**● pubSub**: *`PubSub`* =  new PubSub()

*Defined in [controllers/graphql/resolvers/screenshot.ts:5](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L5)*

___

## Object literals

<a id="screenshotresolver"></a>

### `<Const>` screenshotResolver

**screenshotResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/screenshot.ts:17](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L17)*

Screenshot resolver Returns Base64 image string depending on the input

<a id="screenshotresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/screenshot.ts:18](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L18)*

<a id="screenshotresolver.query.screenshot-1"></a>

####  screenshot

▸ **screenshot**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Screenshot](../interfaces/_controllers_graphql_resolvers_screenshot_.screenshot.md)>

*Defined in [controllers/graphql/resolvers/screenshot.ts:24](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L24)*

Returns screenshot of site by given URL in Base64 encoding

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| URL | `any` |

**Returns:** `Promise`<[Screenshot](../interfaces/_controllers_graphql_resolvers_screenshot_.screenshot.md)>

___

___
<a id="screenshotresolver.subscription"></a>

####  Subscription

**Subscription**: *`object`*

*Defined in [controllers/graphql/resolvers/screenshot.ts:35](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L35)*

<a id="screenshotresolver.subscription.screenshotreceived"></a>

####  screenshotReceived

**screenshotReceived**: *`object`*

*Defined in [controllers/graphql/resolvers/screenshot.ts:41](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L41)*

Subscription (uses websocket) because this operation can be too much long

<a id="screenshotresolver.subscription.screenshotreceived.subscribe"></a>

####  subscribe

▸ **subscribe**(): `AsyncIterator`<`symbol`>

*Defined in [controllers/graphql/resolvers/screenshot.ts:42](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/controllers/graphql/resolvers/screenshot.ts#L42)*

**Returns:** `AsyncIterator`<`symbol`>

___

___

___

___

