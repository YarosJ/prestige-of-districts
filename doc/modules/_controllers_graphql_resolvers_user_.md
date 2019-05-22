[prestige-of-districts](../README.md) > ["controllers/graphql/resolvers/user"](../modules/_controllers_graphql_resolvers_user_.md)

# External module: "controllers/graphql/resolvers/user"

## Index

### Interfaces

* [RefreshToken](../interfaces/_controllers_graphql_resolvers_user_.refreshtoken.md)
* [SignIn](../interfaces/_controllers_graphql_resolvers_user_.signin.md)

### Object literals

* [userResolver](_controllers_graphql_resolvers_user_.md#userresolver)

---

## Object literals

<a id="userresolver"></a>

### `<Const>` userResolver

**userResolver**: *`object`*

*Defined in [controllers/graphql/resolvers/user.ts:25](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L25)*

Users resolver. Accepts input and converts it to commands for the users model.

<a id="userresolver.mutation"></a>

####  Mutation

**Mutation**: *`object`*

*Defined in [controllers/graphql/resolvers/user.ts:49](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L49)*

<a id="userresolver.mutation.deleteuser"></a>

####  deleteUser

▸ **deleteUser**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[User](../classes/_models_user_.user.md)>

*Defined in [controllers/graphql/resolvers/user.ts:147](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L147)*

Deletes user by given id

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| id | `any` |

**Returns:** `Promise`<[User](../classes/_models_user_.user.md)>

___
<a id="userresolver.mutation.logout"></a>

####  logOut

▸ **logOut**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<`boolean`>

*Defined in [controllers/graphql/resolvers/user.ts:113](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L113)*

Adds access and refresh token to blacklist

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| accessToken | `any` |
| refreshToken | `any` |

**Returns:** `Promise`<`boolean`>

___
<a id="userresolver.mutation.refreshtoken-1"></a>

####  refreshToken

▸ **refreshToken**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[RefreshToken](../interfaces/_controllers_graphql_resolvers_user_.refreshtoken.md)>

*Defined in [controllers/graphql/resolvers/user.ts:99](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L99)*

Returns new access token by refresh token

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| refreshToken | `any` |

**Returns:** `Promise`<[RefreshToken](../interfaces/_controllers_graphql_resolvers_user_.refreshtoken.md)>

___
<a id="userresolver.mutation.signin-1"></a>

####  signIn

▸ **signIn**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[SignIn](../interfaces/_controllers_graphql_resolvers_user_.signin.md)>

*Defined in [controllers/graphql/resolvers/user.ts:72](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L72)*

Checks given email and password and returns new access and refresh token

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| email | `any` |
| password | `any` |

**Returns:** `Promise`<[SignIn](../interfaces/_controllers_graphql_resolvers_user_.signin.md)>

___
<a id="userresolver.mutation.signup"></a>

####  signUp

▸ **signUp**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[User](../classes/_models_user_.user.md)>

*Defined in [controllers/graphql/resolvers/user.ts:55](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L55)*

Creates new user in DB

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| email | `any` |
| password | `any` |

**Returns:** `Promise`<[User](../classes/_models_user_.user.md)>

___
<a id="userresolver.mutation.updateuser"></a>

####  updateUser

▸ **updateUser**(parent: *`any`*, __namedParameters: *`object`*): `Promise`<[User](../classes/_models_user_.user.md)>

*Defined in [controllers/graphql/resolvers/user.ts:123](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L123)*

Finds user by given id and update him by given params

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| id | `any` |
| newPassword | `any` |
| previousPassword | `any` |
| role | `any` |

**Returns:** `Promise`<[User](../classes/_models_user_.user.md)>

___

___
<a id="userresolver.query"></a>

####  Query

**Query**: *`object`*

*Defined in [controllers/graphql/resolvers/user.ts:26](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L26)*

<a id="userresolver.query.user"></a>

####  user

▸ **user**(parent: *`any`*, __namedParameters: *`object`*): [User](../classes/_models_user_.user.md)

*Defined in [controllers/graphql/resolvers/user.ts:42](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L42)*

Finds user by given id

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| id | `any` |

**Returns:** [User](../classes/_models_user_.user.md)

___
<a id="userresolver.query.users"></a>

####  users

▸ **users**(parent: *`any`*, __namedParameters: *`object`*): [User](../classes/_models_user_.user.md)[]

*Defined in [controllers/graphql/resolvers/user.ts:32](https://github.com/YarosJ/prestige-of-districts/blob/17f0d7b/controllers/graphql/resolvers/user.ts#L32)*

Finds users and paginate by cursor and limit

**Parameters:**

**parent: `any`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| cursor | `any` |
| limit | `any` |

**Returns:** [User](../classes/_models_user_.user.md)[]

___

___

___

