[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/failure"](../modules/_controllers_graphql_resolvers_failure_.md)

# External module: "controllers/graphql/resolvers/failure"

## Index

### Variables

* [debugFailures](_controllers_graphql_resolvers_failure_.md#debugfailures)

### Object literals

* [failureResolver](_controllers_graphql_resolvers_failure_.md#failureresolver)

---

## Variables

<a id="debugfailures"></a>

### `<Const>` debugFailures

**● debugFailures**: *`any`* =  debug('failuresController')

*Defined in [controllers/graphql/resolvers/failure.ts:8](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L8)*

___

## Object literals

<a id="failureresolver"></a>

### `<Const>` failureResolver

**failureResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/failure.ts:15](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L15)*

Failures resolver. Accepts input and converts it to commands for the failures model.

<a id="failureresolver.mutation"></a>

####  Mutation

**Mutation**: *`object`*

*Defined in [controllers/graphql/resolvers/failure.ts:52](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L52)*

<a id="failureresolver.mutation.addfailure"></a>

####  addFailure

▸ **addFailure**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Failure](../classes/_models_failure_.failure.md)>

*Defined in [controllers/graphql/resolvers/failure.ts:58](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L58)*

Creates new failure by given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| city | `any` |
| country | `any` |
| date | `any` |
| failureType | `any` |
| locations | `any` |
| service | `any` |
| text | `any` |

**Returns:** `Promise`<[Failure](../classes/_models_failure_.failure.md)>

___
<a id="failureresolver.mutation.removefailure"></a>

####  removeFailure

▸ **removeFailure**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Failure](../classes/_models_failure_.failure.md)>

*Defined in [controllers/graphql/resolvers/failure.ts:80](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L80)*

Deletes failure by id or another given params

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

**Returns:** `Promise`<[Failure](../classes/_models_failure_.failure.md)>

___

___
<a id="failureresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/failure.ts:16](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L16)*

<a id="failureresolver.query.failures"></a>

####  failures

▸ **failures**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[Failure](../classes/_models_failure_.failure.md)[]>

*Defined in [controllers/graphql/resolvers/failure.ts:22](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/failure.ts#L22)*

Returns failures filtered by given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| dateRange | `any` |
| failureType | `any` |
| latitude | `any` |
| locRange | `any` |
| locType | `any` |
| longitude | `any` |
| services | `any` |

**Returns:** `Promise`<[Failure](../classes/_models_failure_.failure.md)[]>

___

___

___

