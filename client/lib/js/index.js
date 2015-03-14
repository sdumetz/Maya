var socket = io.connect('http://localhost:8080');
/*******************************
 * base components declaration *
********************************/
model = new Model();


/***********************
 * Events registration *
 **********************/
socket.on("updateCell",function(data){
  model.updateCell(data);
  console.log("some event");
});

//Test
socket.emit('update', { cell: 'data' });
