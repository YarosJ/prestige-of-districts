[prestige-of-districts](../README.md) > ["helpers/authentication/apolloContext"](../modules/_helpers_authentication_apollocontext_.md)

# External module: "helpers/authentication/apolloContext"

## Index

### Functions

* [context](_helpers_authentication_apollocontext_.md#context)
* [getGraphQLAction](_helpers_authentication_apollocontext_.md#getgraphqlaction)

---

## Functions

<a id="context"></a>

### `<Const>` context

▸ **context**(__namedParameters: *`object`*): `Promise`<`ServerResponse` \| `__type`>

*Defined in [helpers/authentication/apolloContext.ts:19](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/authentication/apolloContext.ts#L19)*

Authorization by JWT from the header "Authorization"

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| connection | `any` |
| req | `any` |
| res | `any` |

**Returns:** `Promise`<`ServerResponse` \| `__type`>

___
<a id="getgraphqlaction"></a>

### `<Const>` getGraphQLAction

▸ **getGraphQLAction**(queryString: *`string`*): `string`

*Defined in [helpers/authentication/apolloContext.ts:12](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/authentication/apolloContext.ts#L12)*

Returns GraphQL action from string

**Parameters:**

| Name | Type |
| ------ | ------ |
| queryString | `string` |

**Returns:** `string`

___

