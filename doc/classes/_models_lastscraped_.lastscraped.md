[prestige-of-districts](../README.md) > ["models/LastScraped"](../modules/_models_lastscraped_.md) > [LastScraped](../classes/_models_lastscraped_.lastscraped.md)

# Class: LastScraped

A model definition. Represents a database of last scraped text messages.

## Hierarchy

 `Typegoose`

**↳ LastScraped**

## Index

### Properties

* [dateToDelete](_models_lastscraped_.lastscraped.md#datetodelete)
* [text](_models_lastscraped_.lastscraped.md#text)

### Methods

* [getModelForClass](_models_lastscraped_.lastscraped.md#getmodelforclass)
* [setModelForClass](_models_lastscraped_.lastscraped.md#setmodelforclass)

---

## Properties

<a id="datetodelete"></a>

###  dateToDelete

**● dateToDelete**: *`Date`*

*Defined in [models/LastScraped.ts:15](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/models/LastScraped.ts#L15)*

___
<a id="text"></a>

###  text

**● text**: *`string`*

*Defined in [models/LastScraped.ts:12](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/models/LastScraped.ts#L12)*

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

