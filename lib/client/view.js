
function View (model,drawZone){
  this.drawZone = drawZone ||$("#content");
  this.grid_size = 10;
  this.tile_size = 100;
  this.x0 = this.tile_size*this.grid_size;
  this.y0 = 100;
  this.model = model;

  //this.model.registerUpdate(this.draw,self);
this.model.onUpdate = this.draw.bind(this);
}


//L = Line ~= Y
//C= Column ~= x
// with origin on top
View.prototype.init = function(){
  this.initSprites();
  this.initZones();
}

View.prototype.initZones = function(){
  var self = this;
  $("body").click(function(e){
    var x = e.pageX-self.x0
      , y = e.pageY-self.y0
      , xt = Math.sqrt(2)*x + Math.sqrt(2)*y
      , yt = -Math.sqrt(2)*x + Math.sqrt(2)*y
      , ratio = 200/Math.sqrt(2)
      , numX = Math.floor(xt/ratio)+1
      , numY = Math.floor(yt/ratio)+1;

    //Click is in the play zone
    if(numX > 0 && numX <= self.grid_size && numY > 0 && numY <= self.grid_size ){
      self.clickOn(numX,numY);
    }else{
      console.log(numX,numY)
    }
  })
}
View.prototype.clickOn = function(x,y){
  var tile = this.model.getTileByCoordinates(x,y);
  tile.contenu = "champs";
  this.model.change(tile);
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
        , "left":x})
    .appendTo("#content");
}


View.prototype.draw= function(cell){
  console.log("cell:",cell)
  $("#"+cell.x+"x"+cell.y).attr("src",this.model.getImage(cell.contenu));
}

module.exports = View;
