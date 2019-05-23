[prestige-of-districts](../README.md) > ["libs/TaskScheduler/index"](../modules/_libs_taskscheduler_index_.md) > [TaskScheduler](../classes/_libs_taskscheduler_index_.taskscheduler.md)

# Class: TaskScheduler

Runs callback by given interval and data for each tasks

## Hierarchy

**TaskScheduler**

## Index

### Constructors

* [constructor](_libs_taskscheduler_index_.taskscheduler.md#constructor)

### Properties

* [myCache](_libs_taskscheduler_index_.taskscheduler.md#mycache)

### Methods

* [addTasks](_libs_taskscheduler_index_.taskscheduler.md#addtasks)
* [deleteTasks](_libs_taskscheduler_index_.taskscheduler.md#deletetasks)
* [taskManager](_libs_taskscheduler_index_.taskscheduler.md#taskmanager)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TaskScheduler**(tasks: *`any`*, config: *`any`*, callback: *`any`*): [TaskScheduler](_libs_taskscheduler_index_.taskscheduler.md)

*Defined in [libs/TaskScheduler/index.ts:8](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/TaskScheduler/index.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tasks | `any` |
| config | `any` |
| callback | `any` |

**Returns:** [TaskScheduler](_libs_taskscheduler_index_.taskscheduler.md)

___

## Properties

<a id="mycache"></a>

### `<Protected>` myCache

**● myCache**: *`NodeCache`*

*Defined in [libs/TaskScheduler/index.ts:8](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/TaskScheduler/index.ts#L8)*

___

## Methods

<a id="addtasks"></a>

###  addTasks

▸ **addTasks**(tasks: *`any`*): `void`

*Defined in [libs/TaskScheduler/index.ts:19](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/TaskScheduler/index.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tasks | `any` |

**Returns:** `void`

___
<a id="deletetasks"></a>

###  deleteTasks

▸ **deleteTasks**(tasks: *`any`*): `void`

*Defined in [libs/TaskScheduler/index.ts:31](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/TaskScheduler/index.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tasks | `any` |

**Returns:** `void`

___
<a id="taskmanager"></a>

### `<Protected>` taskManager

▸ **taskManager**(callback: *`any`*): `void`

*Defined in [libs/TaskScheduler/index.ts:37](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/libs/TaskScheduler/index.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `any` |

**Returns:** `void`

___

