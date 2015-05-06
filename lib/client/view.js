
function View (model,drawZone){
  this.drawZone = drawZone ||$("#content");
  this.model = model;
  this.grid_size = this.model.grid_size;
  this.tile_size = 100;

  this.x0 = this.tile_size*this.grid_size;
  this.y0 = 100;

  //this.model.registerUpdate(this.draw,self);
  this.model.onUpdate = this.draw.bind(this);
  this.model.onGui = this.menu.bind(this);
  this.dragging = false;
  this.lastDrag = {x:0,y:0};
  this.lastTransform = {x:0,y:0};
}


//L = Line ~= Y
//C= Column ~= x
// with origin on top
View.prototype.init = function(){
  this.initSprites();
  this.initZones();
  this.menu();
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
  var self = this;
  if(self.dragging){
    self.lastTransform.x += e.pageX-self.lastDrag.x
    self.lastTransform.y += e.pageY-self.lastDrag.y
    console.log(self.lastTransform);
    content.css({
      "-webkit-transform":"translate("+(self.lastTransform.x)+"px,"+(self.lastTransform.y)+"px)"
    })
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

View.prototype.initSprites = function(){
  var self = this
    , grid_size = this.grid_size;

  for (i = 1;i <= grid_size;i++){
    for (j = 1;j <= i;j++){
      L = i-j+1;
      C = j;
      src = this.model.getImageByCoordinates(C,L);
      self.createCell(L, C, src);
    }
  }
  for (i=1;i<=grid_size-1;i++){
    for (j=1;j<=grid_size-i;j++){
      C = grid_size-j+1;
      L = i+j;
      src = this.model.getImageByCoordinates(C,L);;
      self.createCell(L, C, src);
    }
  }
  src = "img/fond.png"
  for(i=2;i<=grid_size;i++){
    self.createFond(grid_size+2, i, src);
    self.createFond(i+1,  grid_size+1, src);
  }
  self.createFond(grid_size+2,  grid_size+1, src);
}
View.prototype.createFond = function (L, C, src){
  var tile_size = this.tile_size;
  x = (C - L)*tile_size + this.x0 - tile_size+100;
  y = (1+0.5*(C + L))*tile_size+this.y0-3*tile_size;
  var el = $('<img class="tile"></img>')
    .attr("src",src)
    .css({"top":y
        , "left":x
        , "z-index":-1
        })
    .appendTo("#content");
}
View.prototype.createFond2 = function (L, C, src){
  var tile_size = this.tile_size;
  x = (C - L)*tile_size + this.x0 - tile_size+100;
  y = (1+0.5*(C + L))*tile_size+this.y0-3*tile_size;
  var el = $('<img class="tile"></img>')
    .attr("src",src)
    .css({"top":y
        , "left":x
        , "z-index":-1
        })
    .appendTo("#content");
}

View.prototype.createCell = function (L, C, src){
  var tile_size = this.tile_size;
  x = (C - L)*tile_size + this.x0 - tile_size;
  y = (1+0.5*(C + L))*tile_size+this.y0-3*tile_size;
  var el = $('<img id="'+C+'x'+L+'" class="tile"></img>')
    .attr("src",src)
    .css({"top":y
        , "left":x
        })
    .appendTo("#content");
}


View.prototype.draw= function(cell){
  console.log("cell:",cell)
  $("#"+cell.x+"x"+cell.y).attr("src",this.model.getImage(cell.contenu));
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
