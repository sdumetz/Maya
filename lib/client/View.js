var Utils = require("./Utils");
function View (model,drawZone){
  //LEGACY CODE
  this.drawZone = drawZone ||$("#content");
  this.docheight = 0;
  this.docwidth = 0;
  this.resizeCanvas(this.drawZone);
  this.stage = new createjs.Stage("content");
  //this.context = this.drawZone.get(0).getContext('2d');
  console.log(this.context);
  this.model = model;
  this.tile_size = 100;
  this.grid_size = Math.floor(Math.min(this.docwidth,this.docheight)/(this.tile_size)+1)*2;
  //this.x0 = this.tile_size*this.grid_size;
  //this.y0 = 100;
  this.x0 = this.docwidth/2;
  this.y0 = this.docheight/2;
  //this.model.registerUpdate(this.draw,self);
  this.model.onUpdate = this.draw.bind(this);
  this.model.onGui = this.menu.bind(this);
  this.dragging = false;
  this.lastDrag = {x:0,y:0};
  this.lastTransform = {x:-this.x0,y:-this.y0};
  //END OF LEGACY CODE
  //
  this.stage = new createjs.Stage("content");
}
View.prototype.resizeCanvas = function(zone){
  if(!zone){ zone = this.drawZone};
  this.docheight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
  this.docwidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
  zone.attr("height",this.docheight)
      .attr("width",this.docwidth);
}

//L = Line ~= Y
//C= Column ~= x
// with origin on top
View.prototype.init = function(){
  //this.initSprites();
  var self = this;
  this.drawMap();
  this.initZones();
  //this.menu(); //TODO wARNING : menu desactivated

}
View.prototype.draw= function(id,src){
  this.drawMap();
}

View.prototype.drawMap = function(){
  var self = this
    , list = []
    , removeList = false
  this.stage.removeAllChildren();
  this.stage.addChild.apply(this.stage,this.model.getIn());
  /*
  this.stage.children.forEach(function(bmp,index){
    //bmp.x+=diffx;
    //bmp.y+=diffy;
    var coordinates = Utils.Grid.getMapCoordinates(bmp.x,bmp.y,{offset:self.lastTransform})
    if( coordinates.x > start.x+self.grid_size/2-1
        || coordinates.x < start.x-self.grid_size/2+1
        || coordinates.y > start.y+self.grid_size/2-1
        || coordinates.y < start.y-self.grid_size/2+1
        || bmp.y<0){
      bmp.alpha = 0.5;
    }else{
      bmp.visible = true;
    }
  });
  //*/

  self.stage.update();
}


View.prototype.initZones = function(){
  var self = this;
  var content = $("#content")
  $("#menu_bottom>img").click(function(e){
    self.secondClick($(this).attr("id"),e);
    e.preventDefault();
  })
  $(window)
  .on("mousedown",function(e){
    self.dragging = performance.now();
    self.lastDrag = {x:e.pageX,y:e.pageY}
  })
  .on('touchstart', function(e){
    self.dragging = performance.now();
    e.pageX = e.originalEvent.changedTouches[0].pageX;
    e.pageY = e.originalEvent.changedTouches[0].pageY;
    self.lastDrag = {x:e.pageX,y:e.pageY}
  })
  .on('touchend', function(e){
    if(performance.now()-self.dragging<200){
      e.pageX = e.originalEvent.changedTouches[0].pageX;
      e.pageY = e.originalEvent.changedTouches[0].pageY;
      self.click(e);
    }else{
    }
    self.dragging = false;

  })
  .on("mouseup",function(e){
    if(performance.now()-self.dragging<200){
      self.click(e);
    }
    self.dragging = false;
  })
  .on('touchmove', function(e){
    //emulate coordinates
    e.pageX = e.originalEvent.changedTouches[0].pageX;
    e.pageY = e.originalEvent.changedTouches[0].pageY;
    self.move(content,e);
  })
  .on('mousemove', function(e){
    self.move(content,e);
  })
}

View.prototype.click = function(e){
  var height = (document.height !== undefined) ? document.height : document.body.offsetHeight;
  if((e.pageX<$("#menu_bottom").innerWidth() && e.pageY > height -$("#menu_bottom").innerHeight())){

    return true;
  }
  var self = this;
  var place = Utils.Grid.getMapCoordinates(e.pageX,e.pageY,{offset:this.lastTransform})
  self.clickOn(place.x,place.y);
  e.preventDefault();
}

View.prototype.move = function(content,e){
  var self = this
    , toRemove = [];
  if(self.dragging){
    var diffx = e.pageX-self.lastDrag.x
      , diffy = e.pageY-self.lastDrag.y
      /*
    self.stage.children.forEach(function(tile,index){
      tile.x +=diffx;
      tile.y +=diffy;
    })//*/
    this.model.move(diffx,diffy)
    this.drawMap();



    self.lastDrag = {x:e.pageX,y:e.pageY};
    //if(performance.now()-this.dragging>200){
      e.preventDefault();
    //}
  }
}

View.prototype.clickOn = function(x,y){
  var tile = this.model.get(x,y);

}

View.prototype.secondClick = function(id,e){
  var name = id.split("-")[1];
  console.log(this.model);
  if(name && this.model.batiments[name] && $(".tile.active").length >0){
    console.log("valid request");
    var tile = this.model.getTileByDOMId($(".tile.active").attr("id"));
    tile.contenu = name;
    this.model.change(tile);
  }
}




View.prototype.menu = function(){
  var self = this;
  var $menu = $("#menu_top").children()
    .each(function(el){
      var id = $(this).attr("id");
      if(typeof self.model.ressources[id] === "object"){
        $(this).text(self.model.ressources[id].stock);
      }
    })
}

module.exports = View;
