[prestige-of-districts](../README.md) > ["models/Failure"](../modules/_models_failure_.md) > [Failure](../classes/_models_failure_.failure.md)

# Class: Failure

A model definition. Represents a database failures

## Hierarchy

 `Typegoose`

**↳ Failure**

## Index

### Properties

* [failureType](_models_failure_.failure.md#failuretype)
* [happenedAt](_models_failure_.failure.md#happenedat)
* [locations](_models_failure_.failure.md#locations)
* [service](_models_failure_.failure.md#service)
* [text](_models_failure_.failure.md#text)

### Methods

* [getModelForClass](_models_failure_.failure.md#getmodelforclass)
* [setModelForClass](_models_failure_.failure.md#setmodelforclass)

---

## Properties

<a id="failuretype"></a>

###  failureType

**● failureType**: *`string`*

*Defined in [models/Failure.ts:19](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Failure.ts#L19)*

___
<a id="happenedat"></a>

###  happenedAt

**● happenedAt**: *`Date`*

*Defined in [models/Failure.ts:25](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Failure.ts#L25)*

___
<a id="locations"></a>

###  locations

**● locations**: *`Location`[]*

*Defined in [models/Failure.ts:22](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Failure.ts#L22)*

___
<a id="service"></a>

###  service

**● service**: *`string`*

*Defined in [models/Failure.ts:16](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Failure.ts#L16)*

___
<a id="text"></a>

###  text

**● text**: *`string`*

*Defined in [models/Failure.ts:13](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Failure.ts#L13)*

___

## Methods

<a id="getmodelforclass"></a>

###  getModelForClass

▸ **getModelForClass**<`T`>(t: *`T`*, __namedParameters?: *`object`*): `mongoose.Model`<`InstanceType`<`this`>> & `this` & `T`

*Inherited from Typegoose.getModelForClass*

*Defined in node_modules/typegoose/lib/typegoose.d.ts:18*

**Type parameters:**

#### T 
**Parameters:**

**t: `T`**

**`Optional` __namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| existingConnection | `any` |
| existingMongoose | `any` |
| schemaOptions | `any` |

**Returns:** `mongoose.Model`<`InstanceType`<`this`>> & `this` & `T`

___
<a id="setmodelforclass"></a>

###  setModelForClass

▸ **setModelForClass**<`T`>(t: *`T`*, __namedParameters?: *`object`*): `mongoose.Model`<`InstanceType`<`this`>> & `this` & `T`

*Inherited from Typegoose.setModelForClass*

*Defined in node_modules/typegoose/lib/typegoose.d.ts:19*

**Type parameters:**

#### T 
**Parameters:**

**t: `T`**

**`Optional` __namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| existingConnection | `any` |
| existingMongoose | `any` |
| schemaOptions | `any` |

**Returns:** `mongoose.Model`<`InstanceType`<`this`>> & `this` & `T`

___

