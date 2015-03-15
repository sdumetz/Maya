
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
  var body = $("#content")
  $(window)
  .click(function(e){
    //self.click(e);
  })
  .on("mousedown",function(e){
    console.log("mousedown")
    self.dragging = performance.now();
    self.lastDrag = {x:e.pageX,y:e.pageY}
  })
  /*
  .on('touchstart', function(e){
    self.dragging = performance.now();
    self.lastDrag = {x:e.pageX,y:e.pageY}
    self.dragging = true;
  })
  .on('touchend', function(e){
    if(performance.now()-self.dragging<200){
      self.click(e);
    }
    self.dragging = false
  }) //*/
  .on("mouseup",function(e){
    if(performance.now()-self.dragging<200){
      self.click(e);
    }
    self.dragging = false;
  }) /*
  .on('touchmove', function(e){
    console.log("touchmode",e)
    self.move(body,e);
  }) //*/
  .on('mousemove', function(e){
    self.move(body,e);
  })
}

View.prototype.click = function(e){
  var self = this;
  console.log(self.lastTransform)
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
  }else{
    console.log(numX,numY);
  }
}

View.prototype.move = function(body,e){
  var self = this;
  if(self.dragging){
    self.lastTransform.x += e.pageX-self.lastDrag.x
    self.lastTransform.y += e.pageY-self.lastDrag.y
    console.log(self.lastTransform);
    body.css({
      "-webkit-transform":"translate("+(self.lastTransform.x)+"px,"+(self.lastTransform.y)+"px)"
    })
    self.lastDrag = {x:e.pageX,y:e.pageY};
    e.preventDefault();
  }
}

View.prototype.clickOn = function(x,y){
  if($("#"+x+"x"+y).hasClass("active")){
    var tile = this.model.getTileByCoordinates(x,y);
    tile.contenu = "commerce";
    this.model.change(tile);
  }else{
    $(".tile.active").removeClass("active");
    $("#"+x+"x"+y).addClass("active");
  }

  /**

  **/
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

module.exports = View;
