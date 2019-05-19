[prestige-of-districts](../README.md) > ["config/seedDB/accessControl"](../modules/_config_seeddb_accesscontrol_.md)

# External module: "config/seedDB/accessControl"

## Index

### Variables

* [debugAccessControl](_config_seeddb_accesscontrol_.md#debugaccesscontrol)
* [roles](_config_seeddb_accesscontrol_.md#roles)

---

## Variables

<a id="debugaccesscontrol"></a>

### `<Const>` debugAccessControl

**● debugAccessControl**: *`any`* =  debug('seedDB')

*Defined in [config/seedDB/accessControl.ts:4](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/config/seedDB/accessControl.ts#L4)*

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

*Defined in [config/seedDB/accessControl.ts:6](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/config/seedDB/accessControl.ts#L6)*

___

