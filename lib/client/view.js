
function View (model,drawZone){
  this.drawZone = drawZone ||$("#content");
  this.grid_size = 10;
  this.tile_size = 100;
  this.x0 = this.tile_size*this.grid_size;
  this.y0 = 0;
  this.model = model;
}

//L = Line ~= Y
//C= Column ~= x
// with origin on top
View.prototype.init = function(){
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
  x = (C - L)*tile_size + this.x0 ;
  y = (1+0.5*(C + L))*tile_size+this.y0;
  var el = $('<img id="'+C+':'+L+'" class="tile"></img>')
    .attr("src",src)
    .css({"top":y
        , "left":x})
    .appendTo("#content");
}


View.prototype.draw= function(cell){
  $("#"+cell.x+":"+cell.y).attr("src",model.getImage(cell.contenu));
}

module.exports = View;
