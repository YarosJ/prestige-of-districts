[prestige-of-districts](../README.md) > ["models/Target"](../modules/_models_target_.md) > [Target](../classes/_models_target_.target.md)

# Class: Target

A model definition. Represents a database targets

## Hierarchy

 `Typegoose`

**↳ Target**

## Index

### Properties

* [URL](_models_target_.target.md#url)
* [city](_models_target_.target.md#city)
* [country](_models_target_.target.md#country)
* [freq](_models_target_.target.md#freq)
* [service](_models_target_.target.md#service)
* [tagPaths](_models_target_.target.md#tagpaths)

### Methods

* [getModelForClass](_models_target_.target.md#getmodelforclass)
* [setModelForClass](_models_target_.target.md#setmodelforclass)

---

## Properties

<a id="url"></a>

###  URL

**● URL**: *`string`*

*Defined in [models/Target.ts:40](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Target.ts#L40)*

___
<a id="city"></a>

### `<Optional>` city

**● city**: *`string`*

*Defined in [models/Target.ts:52](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Target.ts#L52)*

___
<a id="country"></a>

### `<Optional>` country

**● country**: *`string`*

*Defined in [models/Target.ts:55](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Target.ts#L55)*

___
<a id="freq"></a>

### `<Optional>` freq

**● freq**: *`number`*

*Defined in [models/Target.ts:46](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Target.ts#L46)*

___
<a id="service"></a>

### `<Optional>` service

**● service**: *`string`*

*Defined in [models/Target.ts:49](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Target.ts#L49)*

___
<a id="tagpaths"></a>

### `<Optional>` tagPaths

**● tagPaths**: *`string`[]*

*Defined in [models/Target.ts:43](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/models/Target.ts#L43)*

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

