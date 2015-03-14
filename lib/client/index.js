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

//Test : je prend une case, je change un truc.
model.findCell(0,0,function(cell){
  cell.contenu = "maison";
  socket.emit('update', { cell });
})
