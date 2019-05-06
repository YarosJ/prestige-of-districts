  <p align="center">
    <a href="https://imgur.com/kvJ4IWe"><img src="https://i.imgur.com/kvJ4IWe.png" title="source: imgur.com" /></a>
  </p>
   
### Navigation:

* [Installation](#installation)
* [Configuration](#configuration)
* [Documentation](#documentation)
* [About](#about)

## Installation:

https://docs.docker.com/install/

The first step is to install dependencies:

```sh
$ npm i
```

Then ...

## Configuration

Config variables can be passed in an ...

## Documentation

 [API documentation you can find here.](https://yarosj.github.io/PdGraphDoc/)

## About

  This application uses Docker to automate the deployment and management.
  You can get detailed information about the Docker installation [here](https://docs.docker.com/install/).
  
  This application is written on the Node.js platform (Express.js + ApolloServer).
  Learn more about Apollo [here](https://www.apollographql.com/).
  
  [MongoDB](https://www.mongodb.com/) is used as a database.
  [Redis](https://redis.io/) is used for caching on server.
  
  For client-server communication uses [GraphQL](https://graphql.org/learn/) - query language with open source software, developed by Facebook.
  
  For “web scraping” uses the [Puppeteer](https://github.com/GoogleChrome/puppeteer) - “Headless Google Chrome”.
  
  A multi-protocol message broker - [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-one-python.html) is used to communicate between the Node.js and Python processes.
  
  For processing, classifying and extracting entities from the received text, [SpaCy](https://spacy.io/) library in python is used.
  This library includes convolutional neural network models for tagging parts of speech, analyzing dependencies, and recognizing named entities (NER).
  SpaCy package structure:
  
  Since the Ukrainian and Russian languages ​​are not supported, the model was trained on the data of municipal services of the city of Kramatorsk.
  
  The result of the text analysis (extraction of entities) is transmitted through the message broker to the geocoder where it finds the coordinates of the entities (locations)
  
  Results are displayed on the heatmap, pointmap and 3D heatmap on the client.

  Heatmap example:
   <p align="center">
     <img src="https://i.imgur.com/U8m0MIF.png" width="90%" />
   </p>

  Pointmap example:
   <p align="center">
     <img src="https://i.imgur.com/iCM7IHa.png" width="90%" />
   </p>
       
  The client application is written in ReactJS, using ApolloGQL to communicate with the server. Failures are displayed on maps (point map heat map and 3D heatmap). For maps, the MapboxGl and DeckGl libraries are used. As the UI component Library is used SemanticUI.

## Dependencies:

This application requires `npm` version `x.x.x` or higher,  `node.js` version `x.x.x` or higher, Webpack version `x.x.x`, and ...


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
