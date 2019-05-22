[prestige-of-districts](../README.md) > ["models/Message"](../modules/_models_message_.md) > [Message](../classes/_models_message_.message.md)

# Class: Message

A model definition. Represents a database messages.

## Hierarchy

 `Typegoose`

**↳ Message**

## Index

### Properties

* [happenedAt](_models_message_.message.md#happenedat)
* [locations](_models_message_.message.md#locations)
* [service](_models_message_.message.md#service)
* [text](_models_message_.message.md#text)

### Methods

* [getModelForClass](_models_message_.message.md#getmodelforclass)
* [setModelForClass](_models_message_.message.md#setmodelforclass)

---

## Properties

<a id="happenedat"></a>

###  happenedAt

**● happenedAt**: *`Date`*

*Defined in [models/Message.ts:22](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/Message.ts#L22)*

___
<a id="locations"></a>

###  locations

**● locations**: *`Location`[]*

*Defined in [models/Message.ts:19](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/Message.ts#L19)*

___
<a id="service"></a>

###  service

**● service**: *`string`*

*Defined in [models/Message.ts:16](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/Message.ts#L16)*

___
<a id="text"></a>

###  text

**● text**: *`string`*

*Defined in [models/Message.ts:13](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/Message.ts#L13)*

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

