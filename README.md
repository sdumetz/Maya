# Maya
Maya is a city builder aiming to have a strong population simulation.

##ES6

Maya relies quiete heavily on cutting-edge ES6 spec. See [es6.md](es6.md)

## Roadmap

  - Merge Canvas Branch
  - Decide if we use creatjs for canvas management
  - Make a simple REST API with basic query
  - Make a simple grid display
  - Add back drag & click support
  - Extend REST API for data POST to server
  -

## Docker
This app is containerized.
To create the image, run :
    docker build -t maya ./

To run the app, run :
    docker run -p 8081:8080 -d maya

App is then available on port 8081

## Data model

### Basic

basic model is an array of tiles represented by :

- **Required (valid and not null)**
  - content (string hash)
  - x (int)
  - y (int)



## Network

Networking is mainly event-based

### Routes

#### GET /

Get game client

### Events

**Events are sent using the [socket.io](http://socket.io) library**

They can be categorized as server-sent events or client-sent events

#### subscribe (client)

Subscribe on a chunk of data modifications

#### unsubscribe (client)

Unsubscribe from a chunck

#### update (server)

notify clients of an array of updated tiles.
