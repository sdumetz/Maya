
function View (model,drawZone){
  this.drawZone = drawZone;
  this.model = model;
  this.gridSize = 10;
  this.tileSize = 100;
  this.x0 = this.tileSize*this.gridSize;
  this.y0 = 100;
  this.dragging = false;
  this.lastDrag = {x:0,y:0};
  this.transform = {x:0,y:0};
  console.log("hello world");
}
