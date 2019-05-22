[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/permission"](../modules/_controllers_graphql_resolvers_permission_.md)

# External module: "controllers/graphql/resolvers/permission"

## Index

### Object literals

* [permissionResolver](_controllers_graphql_resolvers_permission_.md#permissionresolver)

---

## Object literals

<a id="permissionresolver"></a>

### `<Const>` permissionResolver

**permissionResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/permission.ts:8](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L8)*

Permissions resolver. Accepts input and converts it to commands for the permissions model.

<a id="permissionresolver.mutation"></a>

####  Mutation

**Mutation**: *`object`*

*Defined in [controllers/graphql/resolvers/permission.ts:28](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L28)*

<a id="permissionresolver.mutation.addaction"></a>

####  addAction

▸ **addAction**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Permission](../classes/_models_permission_.permission.md)>

*Defined in [controllers/graphql/resolvers/permission.ts:43](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L43)*

Finds permission and pushes into this new action

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| action | `any` |
| role | `any` |

**Returns:** `Promise`<[Permission](../classes/_models_permission_.permission.md)>

___
<a id="permissionresolver.mutation.addrole"></a>

####  addRole

▸ **addRole**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Permission](../classes/_models_permission_.permission.md)>

*Defined in [controllers/graphql/resolvers/permission.ts:34](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L34)*

Creates new permission by role and actions

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| actions | `any` |
| role | `any` |

**Returns:** `Promise`<[Permission](../classes/_models_permission_.permission.md)>

___
<a id="permissionresolver.mutation.deleteaction"></a>

####  deleteAction

▸ **deleteAction**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Permission](../classes/_models_permission_.permission.md)>

*Defined in [controllers/graphql/resolvers/permission.ts:64](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L64)*

Finds permission and pulls from this given action

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| action | `any` |
| role | `any` |

**Returns:** `Promise`<[Permission](../classes/_models_permission_.permission.md)>

___
<a id="permissionresolver.mutation.deleterole"></a>

####  deleteRole

▸ **deleteRole**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Permission](../classes/_models_permission_.permission.md)>

*Defined in [controllers/graphql/resolvers/permission.ts:54](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L54)*

Deletes permission by given role

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| role | `any` |

**Returns:** `Promise`<[Permission](../classes/_models_permission_.permission.md)>

___

___
<a id="permissionresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/permission.ts:9](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L9)*

<a id="permissionresolver.query.actions"></a>

####  actions

▸ **actions**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Permission](../classes/_models_permission_.permission.md)>

*Defined in [controllers/graphql/resolvers/permission.ts:23](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L23)*

Returns permission by role

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| role | `any` |

**Returns:** `Promise`<[Permission](../classes/_models_permission_.permission.md)>

___
<a id="permissionresolver.query.roles"></a>

####  roles

▸ **roles**(): `Promise`<[Permission](../classes/_models_permission_.permission.md)[]>

*Defined in [controllers/graphql/resolvers/permission.ts:15](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/graphql/resolvers/permission.ts#L15)*

Returns all roles

**Returns:** `Promise`<[Permission](../classes/_models_permission_.permission.md)[]>

___

___

___

