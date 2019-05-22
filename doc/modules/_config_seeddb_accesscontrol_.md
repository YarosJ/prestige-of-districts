[prestige-of-districts](../README.md) > ["config/seedDB/accessControl"](../modules/_config_seeddb_accesscontrol_.md)

# External module: "config/seedDB/accessControl"

## Index

### Variables

* [debugAccessControl](_config_seeddb_accesscontrol_.md#debugaccesscontrol)
* [roles](_config_seeddb_accesscontrol_.md#roles)

### Functions

* [seedAccessControl](_config_seeddb_accesscontrol_.md#seedaccesscontrol)

---

## Variables

<a id="debugaccesscontrol"></a>

### `<Const>` debugAccessControl

**● debugAccessControl**: *`any`* =  debug('seedDB')

*Defined in [config/seedDB/accessControl.ts:4](https://github.com/YarosJ/prestige-of-districts/blob/828e334/config/seedDB/accessControl.ts#L4)*

___
<a id="roles"></a>

### `<Const>` roles

**● roles**: *`object`[]* =  [
  {
    role: 'guest',
    actions: ['signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'services', '__schema', 'total'],
  },
  {
    role: 'user',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema', 'total',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
      ],
  },
  {
    role: 'admin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema', 'total',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'targets', 'addTarget', 'removeTarget', 'updateTarget', 'users',
        'screenshot', 'selector',
      ],
  },
  {
    role: 'superAdmin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema', 'total',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'targets', 'addTarget', 'removeTarget', 'updateTarget', 'users',
        'roles', 'actions', 'addRole', 'addAction', 'deleteRole', 'deleteAction', 'updateUser', 'deleteUser',
        'screenshot', 'selector',
      ],
  },
]

*Defined in [config/seedDB/accessControl.ts:6](https://github.com/YarosJ/prestige-of-districts/blob/828e334/config/seedDB/accessControl.ts#L6)*

___

## Functions

<a id="seedaccesscontrol"></a>

### `<Const>` seedAccessControl

▸ **seedAccessControl**(permanent: *`any`*): `Promise`<`void`>

*Defined in [config/seedDB/accessControl.ts:47](https://github.com/YarosJ/prestige-of-districts/blob/828e334/config/seedDB/accessControl.ts#L47)*

Sowing access control

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| permanent | `any` |  if this parameter true all old access control will be deleted |

**Returns:** `Promise`<`void`>

___

