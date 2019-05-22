[prestige-of-districts](../README.md) > ["models/User"](../modules/_models_user_.md) > [User](../classes/_models_user_.user.md)

# Class: User

A model definition. Represents a database for users.

## Hierarchy

 `Typegoose`

**↳ User**

## Index

### Properties

* [createdAt](_models_user_.user.md#createdat)
* [email](_models_user_.user.md#email)
* [hashedPassword](_models_user_.user.md#hashedpassword)
* [refreshToken](_models_user_.user.md#refreshtoken)
* [role](_models_user_.user.md#role)
* [salt](_models_user_.user.md#salt)
* [targets](_models_user_.user.md#targets)

### Accessors

* [password](_models_user_.user.md#password)

### Methods

* [encryptPassword](_models_user_.user.md#encryptpassword)
* [getModelForClass](_models_user_.user.md#getmodelforclass)
* [setModelForClass](_models_user_.user.md#setmodelforclass)
* [validPassword](_models_user_.user.md#validpassword)

---

## Properties

<a id="createdat"></a>

###  createdAt

**● createdAt**: *`Date`*

*Defined in [models/User.ts:51](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L51)*

___
<a id="email"></a>

###  email

**● email**: *`string`*

*Defined in [models/User.ts:36](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L36)*

___
<a id="hashedpassword"></a>

###  hashedPassword

**● hashedPassword**: *`string`*

*Defined in [models/User.ts:45](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L45)*

___
<a id="refreshtoken"></a>

### `<Optional>` refreshToken

**● refreshToken**: *`string`*

*Defined in [models/User.ts:48](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L48)*

___
<a id="role"></a>

###  role

**● role**: *`string`*

*Defined in [models/User.ts:42](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L42)*

___
<a id="salt"></a>

###  salt

**● salt**: *`string`*

*Defined in [models/User.ts:28](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L28)*

___
<a id="targets"></a>

###  targets

**● targets**: *[Target](_models_user_.target.md)[]*

*Defined in [models/User.ts:54](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L54)*

___

## Accessors

<a id="password"></a>

###  password

**set password**(password: *`any`*): `void`

*Defined in [models/User.ts:57](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| password | `any` |

**Returns:** `void`

___

## Methods

<a id="encryptpassword"></a>

###  encryptPassword

▸ **encryptPassword**(this: *`ModelType`<[User](_models_user_.user.md)> & [User](_models_user_.user.md)*, password: *`string`*): `string`

*Defined in [models/User.ts:67](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L67)*

Encrypting given password

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | `ModelType`<[User](_models_user_.user.md)> & [User](_models_user_.user.md) |
| password | `string` |

**Returns:** `string`

___
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
<a id="validpassword"></a>

###  validPassword

▸ **validPassword**(this: *`ModelType`<[User](_models_user_.user.md)> & [User](_models_user_.user.md)*, password: *`string`*): `boolean`

*Defined in [models/User.ts:76](https://github.com/YarosJ/prestige-of-districts/blob/828e334/models/User.ts#L76)*

Comparing given password with hashed password

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | `ModelType`<[User](_models_user_.user.md)> & [User](_models_user_.user.md) |
| password | `string` |

**Returns:** `boolean`

___

