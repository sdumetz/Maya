var Model = require("../model");

var socket = io.connect('http://localhost:8080');
/*******************************
 * base components declaration *
********************************/
model = new Model();


/***********************
 * Events registration *
 **********************/
socket.on("update",function(data){
  model.update(data);
  console.log("updated Model");
});

//Test
socket.emit('update', { cell: 'data' });
