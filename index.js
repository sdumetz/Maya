var path = require("path")
  , express =require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , Model = require("./lib/model");


var model = new Model();
server.listen(8080);
console.log("server started on http://localhost:8080");


app.use(express.static('public'));
app.use('/dist',express.static('dist'));

io.on('connection', function (socket) {
  socket.join('room');
  socket.on('update', function (data) {
    console.log("updating server");
    model.update(data,function(data){
      io.to('room').emit('update',data);
    })

  });
});
