[prestige-of-districts](../README.md) > ["config/seedDB/admin"](../modules/_config_seeddb_admin_.md)

# External module: "config/seedDB/admin"

## Index

### Variables

* [debugAdmin](_config_seeddb_admin_.md#debugadmin)
* [email](_config_seeddb_admin_.md#email)
* [password](_config_seeddb_admin_.md#password)
* [role](_config_seeddb_admin_.md#role)

### Functions

* [seedAdmin](_config_seeddb_admin_.md#seedadmin)

---

## Variables

<a id="debugadmin"></a>

### `<Const>` debugAdmin

**● debugAdmin**: *`any`* =  debug('seedDB')

*Defined in [config/seedDB/admin.ts:5](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/config/seedDB/admin.ts#L5)*

___
<a id="email"></a>

###  email

**● email**: *`string`*

*Defined in [config/seedDB/admin.ts:7](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/config/seedDB/admin.ts#L7)*

___
<a id="password"></a>

###  password

**● password**: *`string`*

*Defined in [config/seedDB/admin.ts:7](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/config/seedDB/admin.ts#L7)*

___
<a id="role"></a>

###  role

**● role**: *`string`*

*Defined in [config/seedDB/admin.ts:7](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/config/seedDB/admin.ts#L7)*

___

## Functions

<a id="seedadmin"></a>

### `<Const>` seedAdmin

▸ **seedAdmin**(permanent: *`any`*): `Promise`<`void`>

*Defined in [config/seedDB/admin.ts:14](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/config/seedDB/admin.ts#L14)*

Seed admin user

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| permanent | `any` |  if this parameter true all old access control will be deleted |

**Returns:** `Promise`<`void`>

___

