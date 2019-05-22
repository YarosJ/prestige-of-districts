[prestige-of-districts](../README.md) > ["controllers/ActionDispatcher"](../modules/_controllers_actiondispatcher_.md) > [ActionDispatcher](../classes/_controllers_actiondispatcher_.actiondispatcher.md)

# Class: ActionDispatcher

## Hierarchy

**ActionDispatcher**

## Index

### Methods

* [dispatch](_controllers_actiondispatcher_.actiondispatcher.md#dispatch)

### Object literals

* [actions](_controllers_actiondispatcher_.actiondispatcher.md#actions)

---

## Methods

<a id="dispatch"></a>

### `<Static>` dispatch

▸ **dispatch**(action: *`any`*): `void`

*Defined in [controllers/ActionDispatcher.ts:22](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L22)*

Dispatches action depending on the action type

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | `any` |

**Returns:** `void`

___

## Object literals

<a id="actions"></a>

### `<Static>` actions

**actions**: *`object`*

*Defined in [controllers/ActionDispatcher.ts:10](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L10)*

<a id="actions.fault"></a>

####  FAULT

**● FAULT**: *[addFailure](../modules/_controllers_graphql_resolvers_failure_.md#failureresolver.mutation.addfailure)* =  addFailure

*Defined in [controllers/ActionDispatcher.ts:11](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L11)*

___
<a id="actions.info"></a>

####  INFO

**● INFO**: *[addMessage](../modules/_controllers_graphql_resolvers_message_.md#messageresolver.mutation.addmessage)* =  addMessage

*Defined in [controllers/ActionDispatcher.ts:14](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L14)*

___
<a id="actions.repair"></a>

####  REPAIR

**● REPAIR**: *[addMessage](../modules/_controllers_graphql_resolvers_message_.md#messageresolver.mutation.addmessage)* =  addMessage

*Defined in [controllers/ActionDispatcher.ts:13](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L13)*

___
<a id="actions.toxic"></a>

####  TOXIC

**● TOXIC**: *[addFailure](../modules/_controllers_graphql_resolvers_failure_.md#failureresolver.mutation.addfailure)* =  addFailure

*Defined in [controllers/ActionDispatcher.ts:12](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L12)*

___
<a id="actions.default"></a>

####  default

▸ **default**(): `void`

*Defined in [controllers/ActionDispatcher.ts:15](https://github.com/YarosJ/prestige-of-districts/blob/828e334/controllers/ActionDispatcher.ts#L15)*

**Returns:** `void`

___

___

