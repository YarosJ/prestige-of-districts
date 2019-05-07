  <p align="center">
    <a href="https://github.com/YarosJ/prestige-of-districts"><img src="https://i.imgur.com/kvJ4IWe.png" title="source: imgur.com" /></a>
  </p>

### Navigation:

* [Dependencies](#dependencies)
* [How to use](#how-to-use)
* [Configuration](#configuration)
* [Documentation](#documentation)
* [About](#about)

## Dependencies:

This application requires `docker` version  `18.06.3-ce` or higher and `docker-compose` version `1.24.0` or higher:

* How to install Docker read [there](https://docs.docker.com/install/).
* How to install Docker Compose read [there](https://docs.docker.com/compose/install/).

If you want to edit client app you need in `npm` version `5.5.1` or higher,  `Node.js` version `8.11.2` or higher and `Webpack` version `3.2.1` or higher.
Then you can install dependencies. To do this, you need to go to the directory `/view` and enter the following command in the terminal:

```sh
$ npm i
```

## How to use:

To start app you need in running Docker.

Before starting you need to [build](https://docs.docker.com/compose/reference/build/) app:

```sh
$ docker-compose build
```

Then start up your application:

```sh
$ docker-compose up
```

> __Important!__ If you run docker with sudo you should run docker-compose with sudo too.

Enter `http://localhost:5000` in a browser to see the application running.

If you want to explore GraphQL API with [GraphiQL](https://github.com/graphql/graphiql) enter `http://localhost:5000/graphql`.

If you want to watch interactive graph of GraphQL API enter `http://localhost:5000/voyager`.

>If you have trouble with ports you can change them in `docker-compose.yml`.
---
If you want to edit client you can run client app with webpack-dev-server:

```sh
$ npm start
```

Or if you want to build client app you should enter:

```sh
$ npm run build
```

## Configuration

Config variables can be passed in an `docker-compose.yml`.

## Documentation

 [API documentation you can find here.](https://yarosj.github.io/PdGraphDoc/)

## About

  This application is written on the Node.js platform (Express.js + ApolloServer).
  Learn more about Apollo [here](https://www.apollographql.com/).
  
  [MongoDB](https://www.mongodb.com/) is used as a database.
  [Redis](https://redis.io/) is used for caching on server.
  
  For client-server communication uses [GraphQL](https://graphql.org/learn/) - query language with open source software, developed by Facebook.
  
  For “web scraping” uses the [Puppeteer](https://github.com/GoogleChrome/puppeteer) - “Headless Google Chrome”.
  
  A multi-protocol message broker - [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-one-python.html) is used to communicate between the Node.js and Python processes.
  
  For processing, classifying and extracting entities from the received text, [SpaCy](https://spacy.io/) library in python is used.
  This library includes convolutional neural network models for tagging parts of speech, analyzing dependencies, and recognizing named entities (NER).
  SpaCy package structure is displayed on image 1. Learn more about SpaCy architecture you can [there](https://spacy.io/api).
  
   <p align="center">
      <img src="https://i.imgur.com/w9uFhOj.png" width="70%" />
   </p>
   <p align="center">Image 1 - SpaCy package structure.</p>
   <br/>
  
  Since the Ukrainian and Russian languages ​​are not supported, the model was trained on the data of municipal services of the city of Kramatorsk.
  
  The result of the text analysis (extraction of entities) is transmitted through the message broker to the geocoder where it finds the coordinates of the entities (locations)
  
  Results are displayed on the heatmap (Image 2), pointmap (Image 3) and 3D heatmap on the client.

   <p align="center">
      <img src="https://i.imgur.com/iCM7IHa.png" width="90%" />
   </p>
   <p align="center">Image 2 - Pointmap example.</p>
   <br/>

   <br/>
   <p align="center">
      <img src="https://i.imgur.com/U8m0MIF.png" width="90%" />
   </p>
   <p align="center">Image 3 - Heatmap example.</p>
   <br/>

  The client application is written in ReactJS, using ApolloGQL to communicate with the server. Failures are displayed on maps (point map heat map and 3D heatmap). For maps, the MapboxGl and DeckGl libraries are used. As the UI component Library is used SemanticUI.

## License

MIT License. Copyright 2019 Yaroslaw Zhuk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
