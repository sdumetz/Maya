var Utils = require("../Utils");

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
  this.menu();

}
View.prototype.draw= function(id,src){
  this.drawMap();
}

View.prototype.drawMap = function(){
  var self = this
    , list = []
    , removeList = false
    , start = Utils.Grid.getMapCoordinates(this.x0,this.y0,{offset:self.lastTransform});
  this.stage.removeAllChildren();
  var countBefore = this.stage.children.length;
  for(var i = start.x-this.grid_size/2; i <= start.x + this.grid_size/2; i++){
    for(var j = start.y-this.grid_size/2; j <= start.y + this.grid_size/2; j++){
      var id = this.model.getImageIdByCoordinates(i,j);
      list.push(this.create(i,j,this.model.getImageSrcByCoordinates(i,j)));
    }
  }
  this.stage.children.forEach(function(bmp,index){
    //bmp.x+=diffx;
    //bmp.y+=diffy;
    var coordinates = Utils.Grid.getMapCoordinates(bmp.x,bmp.y,{offset:self.lastTransform})
    if( coordinates.x > start.x+self.grid_size/2
        || coordinates.x < start.x-self.grid_size/2
        || coordinates.y > start.y+self.grid_size/2
        || coordinates.y < start.y-self.grid_size/2
        || bmp.y<0){
      bmp.alpha = 0.5;
    }else{
      bmp.visible = true;
    }
  });
  //*/

  this.stage.sortChildren(function(obj1,obj2){
    var map1 = Utils.Grid.getMapCoordinates(obj1.x,obj1.y)
      , map2 = Utils.Grid.getMapCoordinates(obj2.x,obj2.y)
    if(map1.y>map2.y){
      return 1;
    }else if(map1.y === map2.y && map1.x>map2.x){
      return 1
    }else{
      return -1
    }
  })
  self.stage.update();
}

View.prototype.create = function(i,j,src){
  var co = Utils.Grid.getPageCoordinates(i,j,{offset:this.lastTransform});
  var bmp = new createjs.Bitmap(src);
   bmp.x = co.x;
   bmp.y = co.y;
   bmp.regX = 100;
   bmp.regY = 150;
   bmp;name = i+"x"+j;
   this.stage.addChild(bmp);
   this.model.setTileImageId(i,j,bmp.name);
   return bmp.name;
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
    //$(document.elementFromPoint(e.pageX,e.pageY)).click();
    return true;
  }
  var self = this;
  var x = e.pageX-self.x0 - self.lastTransform.x
    , y = e.pageY-self.y0 - self.lastTransform.y
    , angle = Math.atan(1/2)
    , xt = x/Math.cos(angle) + y/Math.sin(angle)
    , yt = -x/Math.cos(angle) + y/Math.sin(angle)
    , ratio = 100*Math.sqrt(5)
    , numX = Math.floor(xt/ratio)+1
    , numY = Math.floor(yt/ratio)+1;
  //Click is in the play zone
  if(numX > 0 && numX <= self.grid_size && numY > 0 && numY <= self.grid_size ){
    self.clickOn(numX,numY);
    e.preventDefault();
  }else{
  }
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
    self.lastTransform.x -= diffx
    self.lastTransform.y -= diffy
    this.drawMap(diffx,diffy);



    self.lastDrag = {x:e.pageX,y:e.pageY};
    //if(performance.now()-this.dragging>200){
      e.preventDefault();
    //}
  }
}

View.prototype.clickOn = function(x,y){
  if($("#"+x+"x"+y).hasClass("active")){
    var tile = this.model.getTileByCoordinates(x,y);
    tile.contenu = "commerce";
    //this.model.change(tile);
    //TODO : show tooltip
  }else{
    $(".tile.active").removeClass("active");
    $("#"+x+"x"+y).addClass("active");
  }

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
