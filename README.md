# Maya
Maya is a city builder.

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
