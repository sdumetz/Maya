var Model = require("../model/embedded-model.js")
  , View = require("./view")



/*******************************
 * base components declaration *
*******************************/


$(document).ready(function(){
  socket = io.connect('http://'+window.location.host);
  var model = new Model(socket)
    , view = new View(model);
  var onInit = function(){
    if(model.fetched){
      console.log("loading : done")
      view.init();
    }else{
      setTimeout(onInit, 10);
    }
  }
  onInit();

  socket.on("victory",function(data){
    console.log("victory : ",data);
    var docheight = (document.height !== undefined) ? document.height : document.body.offsetHeight
      , docwidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
	  if (docheight>=docwidth){
       $('#game-over')
         .css({
           "width":docwidth/1.5
         });
       var hm = height/2;
    }else{
      $('#game-over')
        .css({
          "width":docwidth/1.5
        });
    };
    var width = $('#game-over').innerWidth();
    var height = $('#game-over').innerHeight();
    $('#game-over')
      .css({
        "margin-left":-width/2,
        "margin-top":-height/2,
        "visibility":"visible"
      })
      setTimeout(function(){
        location.reload();
      },5000)
  })


})
//*/
