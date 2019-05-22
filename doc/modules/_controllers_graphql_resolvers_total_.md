[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/total"](../modules/_controllers_graphql_resolvers_total_.md)

# External module: "controllers/graphql/resolvers/total"

## Index

### Interfaces

* [Total](../interfaces/_controllers_graphql_resolvers_total_.total.md)

### Object literals

* [totalResolver](_controllers_graphql_resolvers_total_.md#totalresolver)

---

## Object literals

<a id="totalresolver"></a>

### `<Const>` totalResolver

**totalResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/total.ts:14](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/total.ts#L14)*

Total resolver. Returns database entry count for received model name.

<a id="totalresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/total.ts:15](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/total.ts#L15)*

<a id="totalresolver.query.total-1"></a>

####  total

▸ **total**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Total](../interfaces/_controllers_graphql_resolvers_total_.total.md)>

*Defined in [controllers/graphql/resolvers/total.ts:21](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/total.ts#L21)*

Returns count documents of target

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| target | `any` |

**Returns:** `Promise`<[Total](../interfaces/_controllers_graphql_resolvers_total_.total.md)>

___

___

___

