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

*Defined in [app.ts:20](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/app.ts#L20)*

___
<a id="debugserver"></a>

### `<Const>` debugServer

**● debugServer**: *`any`* =  require('debug')('Server')

*Defined in [app.ts:18](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/app.ts#L18)*

___
<a id="httpserver"></a>

### `<Const>` httpServer

**● httpServer**: *`Server`* =  http.createServer(app)

*Defined in [app.ts:84](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/app.ts#L84)*

Creating server and adding subscriptions

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

*Defined in [app.ts:60](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/app.ts#L60)*

creating ApolloServer

___

