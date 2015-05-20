/**
 * Main client Model.
 * Will store tiles values
 */
function Model(options){
  options = options || {};
  this.tileSize = options.tileSize||200;
  this.offset = options.offset||{x:0,y:0};
  this.origin = options.origin||{x:0,y:0};

  this.grid = new Grid(this); //This is passed only to pass options properties
}

/**
 * @param  {int} x position (map coordinates)
 * @param  {int} y position (map coordinates)
 * @return {Promise}   A promise for a single Tile Object
 */
Model.prototype.getTile = function(x,y) {
  return this.grid.getTile(x,y);

};
/**
 * get a chunk centered on x,y os size size or this.gridSize
 * @param {int} x map coordinates
 * @param {int} y map coordinates
 * @param {int} l (optionnal) length
 * @return {Promise}   A promise for an array of Tile Objects
 */
Model.prototype.getChunk = function(x,y,l){
  var sequence = [];
  l = l || this.gridSize;
  for(var i = x-l;i<=x+l;i++){
    for(var j = y-l;j<=y+l;j++){
      sequence.push(this.grid.getTile(i,j));
    }
  }
  return Promise.all(sequence);
};

Model.prototype.setTile = function(x,y,data) {

  //TODO : validate data
  this.grid.set(x,y,data);
};
