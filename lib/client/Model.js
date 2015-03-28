var BatList = require("../Shared/BatList")
  , Utils = require("./Utils")
function Model(options){
  options = options || {};
  //Dummy functions that will be replaced by listeners
  this.onUpdate = function(){}
  this.onGui = function(){}
  this.onRequest = function(){}
  //datastore
  this.tiles = new Array();
  this.buildings = new BatList();
  this.toLoad = [];
  this.offset = options.offset||{x:0,y:0};


  //Parameters
  this.tile_size= options.tile_size||200;
  this.grid_size = options.grid_size || 10;

  //Modification check
  this.changed = true;
}
/**
 * Called by the view to request saving of a tile statut.
 */
Model.prototype.store = function(){

}
/**
 * remove a tile from model.
 * Currently unused, should implement some sort of "clean" method.
 * @param  {int} x tile x map coordinate
 * @param  {int} y tile y map coordinate
 */
Model.prototype.remove = function(x,y){

}
Model.prototype.get = function(x,y){
  var tile;
  if(this.tiles[x] && this.tiles[x][y] && typeof this.tiles[x][y] === "object"){
    tile = this.tiles[x][y];
  }else{
    tile = this.updateTile({x:x,y:y,content:"default"});
  }
  return tile;
}

Model.prototype.move = function(diffX,diffY){
  this.offset.x += diffX;
  this.offset.y += diffY;
  this.tiles.forEach(function(y){
    y.forEach(function(bmp){
      bmp.x +=diffX;
      bmp.y+=diffY;
    })
  })
  this.changed = true;
}

/**
 * get all tiles. Maybe not a good idea?
 */
Model.prototype.getAll = function(){

}
/**
 * Get tile at (x,y).
 * @param  {Object} start {x:,y:}
 * @param  {int} size length of the grid
 */
Model.prototype.getIn = function(start,size){
  start = start || Utils.Grid.getMapCoordinates(0,0,{offset:this.offset});
  size = size || this.grid_size
  var list = new Array();
  for(var i = start.x-size/2; i <= start.x + size/2; i++){
    for(var j = start.y-size/2; j <= start.y + size/2; j++){
      list.push(this.get(i,j));
    }
  }
  return list;
}
/**
 * Called on server-side model update
 */
Model.prototype.update = function(data){
  var self = this;
  if(Array.isArray(data)){
    data.forEach(function(tile){
      self.updateTile(tile);
    })
  }else{
    self.updateTile(data)
  }

}
Model.prototype.create = function(tile){
  var co = Utils.Grid.getPageCoordinates(tile.x,tile.y,{offset:this.offset});
  var bmp = new createjs.Bitmap(this.buildings[tile.content].image);
   bmp.x = co.x;
   bmp.y = co.y;
   bmp.regX = 100;
   bmp.regY = 150;
   bmp.name = tile.content;
   this.tiles[tile.x][tile.y] = bmp;
   this.change = true;
   return bmp;
}
/**
 * Update or create tiles[x][y] with a new content
 * @param {[type]} tile [description]
 */
Model.prototype.updateTile = function(tile){
  if(!tile || typeof tile.x !="number" ||typeof tile.y !="number"|| !tile.content){
    return console.log("invalid tile provided for update : ",tile);
  }
  if(!this.tiles[tile.x]){
    this.tiles[tile.x] = new Array();
  }
  this.create(tile);
  return   this.tiles[tile.x][tile.y]
}
/**
 * Model initialisation. Called by Sync class
 * @param {Object} data
 */
Model.prototype.load = function(data){

}


module.exports = Model;
