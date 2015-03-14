var Model = require("../model/embedded-model.js")
  , View = require("./view")


/*******************************
 * base components declaration *
********************************/


$(document).ready(function(){
  var model = new Model()
    , view = new View(model);


  view.init();

  /***********************
   * Events registration *
   **********************/
  socket.on("update",function(data){
    model.update(data);
    console.log("updated Model");
  });
})
