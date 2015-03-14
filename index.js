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
//app.use('/dist',express.static('dist'));


/*************************
 * Model synchronisation *
 * **********************/
io.on('connection', function (socket) {
  socket.join('room');
  socket.on('change', function (data) {
    model.updateCell(data,function(err,changedData){
      if(!err){
        console.log("changedData:",changedData)
        io.to('room').emit('update',{tile:changedData,ressources:model.ressources});
      }else{
        console.log("socket.on Change :"+err);
      }

    })
  });
  socket.on("import",function(data){
    model.fetch(function(err,doc){
      if(err){
        console.log("model.fetch : "+err);
      }
      console.log("model fetch")
      socket.emit("import",doc);
    });
  })

/******************************
 * Game Coroutines            *
 * ***************************/
var routine = function(){
  //Reset ressources that must be.
  model.ressources.habitant.stock = 0;
  model.fetch(function(err,doc){
    doc.cases.forEach(function(tile){
      model.updateRessources(tile);
    });
    Object.keys(model.ressources).every(function(ressource){
      if(ressource.stock < 0){
        console.log("YOU LOOSE");
        return false;
      }else{
        return true;
      }
    });
    io.to("room").emit('routine',{
      ressources:model.ressources
    })
    setTimeout(routine,10000);
  });
}
routine();


});
