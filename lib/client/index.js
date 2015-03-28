var Model = require("./Model")
  , Sync = require("./Sync")
  , View = require("./View");



/*******************************
 * base components declaration *
*******************************/


$(document).ready(function(){
  var docheight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
  var docwidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
  socket = io.connect('http://'+window.location.host);

  $("#content").attr("height",docheight)
      .attr("width",docwidth);
  var options = {
    tile_size:200,
    grid_size: Math.floor(Math.min(docwidth,docheight)/(200)+1)*2,
    offset:{x:docwidth/2,y:docheight/2}
  }
  var model = new Model()
    , sync = new Sync(socket,model)
    , view = new View(model);
  var onInit = function(){
    if(true){
      console.log("loading : done")
      view.init();
    }else{
      setTimeout(onInit, 10);
    }
  }
  onInit();


// DEPRECATED
// Weshould have a leaner way to declare victory...
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
