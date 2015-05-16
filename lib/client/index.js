


/*******************************
 * BOOTSTRAP *
********************************/
document.addEventListener('DOMContentLoaded',function(){
  "use strict";
  var docheight = (document.height !== undefined) ? document.height : document.body.offsetHeight
    , docwidth = (document.width !== undefined) ? document.width : document.body.offsetWidth
    , canvas = document.getElementById("content")
    , options = {
        offset:{
          x:Math.round(docwidth/2),
          y:Math.round(docheight/2)
        },
        tileSize:200,
        gridSize:Math.floor(Math.min(docwidth,docheight)/(200*2)),
        canvas:canvas
      }
    , model = new Model(options)
    , view = new View(options);
    //Set canvas to max height/width
    canvas.style.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
});
