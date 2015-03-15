var Model = require("../model/embedded-model.js")
  , View = require("./view")


/*******************************
 * base components declaration *
********************************/


$(document).ready(function(){
  socket = io.connect('http://'+window.location.host);
  var model = new Model(socket)
    , view = new View(model);
  var onInit = function(){
    if(model.fetched){
      view.init();
    }else{
      setTimeout(onInit, 10);
    }
  }
  onInit();

  socket.on("victory",function(data){
    console.log("victory : ",data);
    var docheight = (document.height !== undefined) ? document.height : document.body.offsetHeight
      , docwidth = (document.width !== undefined) ? document.width : document.body.offsetWidth
	  if (docheight>=docwidth){, width = docwidth/1.5}else{, width = docheight /1.5};
      , hm = height/2;
      , wm = width/2;
    $('#game-over')
      .css({
        "width":width,
        "margin-left":-wm,
        "margin-top":-hm,
        "visibility":"visible"
      })
      setTimeout(function(){
        location.reload();
      },5000)
  })


})
