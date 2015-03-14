var express =require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , model = require("./model");

server.listen(8080);
console.log("server started on http://localhost:8080");
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});
app.use(express.static('client'));
app.use('/model',express.static('model'));

io.on('connection', function (socket) {
  socket.join('room');
  socket.on('update', function (data) {
    io.to('room').emit('update',data);
  });
});
