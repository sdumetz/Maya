
function View (model,drawZone){
  this.drawZone = drawZone;
  this.model = model;
  this.grid_size = this.model.grid_size;
  this.tile_size = 100;
  this.x0 = this.tile_size*this.grid_size;
  this.y0 = 100;
  this.dragging = false;
  this.lastDrag = {x:0,y:0};
  this.transform = {x:0,y:0};
};
