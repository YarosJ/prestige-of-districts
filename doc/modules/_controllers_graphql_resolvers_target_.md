[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/target"](../modules/_controllers_graphql_resolvers_target_.md)

# External module: "controllers/graphql/resolvers/target"

## Index

### Object literals

* [targetResolver](_controllers_graphql_resolvers_target_.md#targetresolver)

---

## Object literals

<a id="targetresolver"></a>

### `<Const>` targetResolver

**targetResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/target.ts:9](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L9)*

Targets resolver. Accepts input and converts it to commands for the targets model.

<a id="targetresolver.mutation"></a>

####  Mutation

**Mutation**: *`object`*

*Defined in [controllers/graphql/resolvers/target.ts:36](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L36)*

<a id="targetresolver.mutation.addtarget"></a>

####  addTarget

▸ **addTarget**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Target](../classes/_models_target_.target.md)>

*Defined in [controllers/graphql/resolvers/target.ts:42](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L42)*

Creates new target (site that will be parsed) by given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| URL | `any` |
| city | `any` |
| country | `any` |
| freq | `any` |
| service | `any` |
| tagPaths | `any` |

**Returns:** `Promise`<[Target](../classes/_models_target_.target.md)>

___
<a id="targetresolver.mutation.removetarget"></a>

####  removeTarget

▸ **removeTarget**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Target](../classes/_models_target_.target.md)>

*Defined in [controllers/graphql/resolvers/target.ts:54](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L54)*

Deletes target by given URL

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| URL | `any` |

**Returns:** `Promise`<[Target](../classes/_models_target_.target.md)>

___
<a id="targetresolver.mutation.updatetarget"></a>

####  updateTarget

▸ **updateTarget**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Target](../classes/_models_target_.target.md)>

*Defined in [controllers/graphql/resolvers/target.ts:66](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L66)*

Updates target by given URL and params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| URL | `any` |
| city | `any` |
| country | `any` |
| freq | `any` |
| tagPaths | `any` |

**Returns:** `Promise`<[Target](../classes/_models_target_.target.md)>

___

___
<a id="targetresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/target.ts:10](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L10)*

<a id="targetresolver.query.services"></a>

####  services

▸ **services**(): `string`[]

*Defined in [controllers/graphql/resolvers/target.ts:24](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L24)*

Returns all supported services

**Returns:** `string`[]

___
<a id="targetresolver.query.tags"></a>

####  tags

▸ **tags**(): `string`[]

*Defined in [controllers/graphql/resolvers/target.ts:16](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L16)*

Returns all supported entities

**Returns:** `string`[]

___
<a id="targetresolver.query.targets"></a>

####  targets

▸ **targets**(): [Target](../classes/_models_target_.target.md)[]

*Defined in [controllers/graphql/resolvers/target.ts:32](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/target.ts#L32)*

Returns all targets

**Returns:** [Target](../classes/_models_target_.target.md)[]

___

___

___

