[prestige-of-districts](../README.md) > ["app"](../modules/_app_.md)

# External module: "app"

## Index

### Variables

* [app](_app_.md#app)
* [debugServer](_app_.md#debugserver)
* [httpServer](_app_.md#httpserver)
* [server](_app_.md#server)

---

## Variables

<a id="app"></a>

### `<Const>` app

**● app**: *`express.Application`* =  express()

*Defined in [app.ts:20](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/app.ts#L20)*

___
<a id="debugserver"></a>

### `<Const>` debugServer

**● debugServer**: *`any`* =  require('debug')('Server')

*Defined in [app.ts:18](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/app.ts#L18)*

___
<a id="httpserver"></a>

### `<Const>` httpServer

**● httpServer**: *`Server`* =  http.createServer(app)

*Defined in [app.ts:85](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/app.ts#L85)*

Creating server and adding subscriptions

*__type__*: {Server \| Http2Server \| Promise}

___
<a id="server"></a>

### `<Const>` server

**● server**: *`ApolloServer`* =  new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context,
  cache: new RedisCache({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  }) as any,
  cacheControl: true,
})

*Defined in [app.ts:61](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/app.ts#L61)*

creating ApolloServer

*__type__*: {ApolloServer}

___

