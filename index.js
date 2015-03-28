var path = require("path")
  , express =require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , Model = require("./lib/Model");


var model = new Model();

var init = function(){
  if(!model.ready()){
    setTimeout(init,50);
    return false;
  }
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
          io.to('room').emit('update',changedData);
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
        var res = Object.keys(model.ressources).every(function(ressource){
          if(model.ressources[ressource].stock && model.ressources[ressource].stock < 0){
            console.log("YOU LOOSE");
            return false;
          }else{

            return true;
          }
        });
        if(!res){
          //We lost the game
          io.to("room").emit("victory",false);
          setTimeout(process.exit,500);
        }else{
          io.to("room").emit('routine',{
            ressources:model.ressources
          })
          setTimeout(routine,10000);
        }

      });
    }
    routine();


  });
}
init();

/****************
 * DEMO MODE
 * *************/
 setTimeout(function(){
   model.updateCell({x:5,y:5,content:"maison"},function(err,changedData){
     if(!err){
       console.log("changedData:",changedData)
       io.to('room').emit('update',changedData);
     }else{
       console.log("socket.on Change :"+err);
     }
   })
 },2000)
 setTimeout(function(){
   model.updateCell({x:4,y:3,content:"maison"},function(err,changedData){
     if(!err){
       console.log("changedData:",changedData)
       io.to('room').emit('update',changedData);
     }else{
       console.log("socket.on Change :"+err);
     }
   })
 },15000)
 setTimeout(function(){
   model.updateCell({x:4,y:5,content:"champs"},function(err,changedData){
     if(!err){
       console.log("changedData:",changedData)
       io.to('room').emit('update',changedData);
     }else{
       console.log("socket.on Change :"+err);
     }
   })
 },5000)
 setTimeout(function(){
   model.updateCell({x:4,y:2,content:"foret"},function(err,changedData){
     if(!err){
       console.log("changedData:",changedData)
       io.to('room').emit('update',changedData);
     }else{
       console.log("socket.on Change :"+err);
     }
   })
 },6000)
