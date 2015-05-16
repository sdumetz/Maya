/**
 * Calc utilities for grid positionning.
 * Basic functions serve for calculating the map position of a page object or the page position of a map object, given a "currentTransform" object.
 * To be efficient, this class requires a set of base informations. These could be given when instanciating the class or on function call.
 * Otherwise, defaults will be used.
 */
function Grid(options){
  this.options = options||{offset:{x:0,y:0},origin:{x:0,y:0},tileSize:200};
  this.tiles = [];
}



/**
 * get Map coordinates of X,Y page coordinates
 * Important note : returned x and y values always get rounded so this function is more of a "over which tile are you at pageX,pageY ?".
 * @param {int} pageX [description]
 * @param {int} pageY [description]
 * @param {Object} opts  relevant options for this function are : offset, tile_size
 * @return {x:,y:}; x and y always get rounded.
 */
Grid.prototype.getMapCoordinates = function(pageX,pageY,opts){
  opts = opts ||{};
  var s = opts.tileSize||this.options.tileSize
    , offset = opts.offset||this.options.offset
    , origin = opts.origin||this.options.origin
    , x = pageX + offset.x-origin.x
    , y = pageY + offset.y-origin.y
    , xt = x/s + 2*y/s
    , yt = 2*y/s -x/s
    , numX = Math.round(xt)
    , numY = Math.round(yt);

  return {x:numX,y:numY};
};
/**
 * get Map coordinates of X,Y page coordinates
 * @param {int} mapX X map coordinate
 * @param {int} mapY Y map coordinate
 * @param {Object} opts  relevant options for this function are : offset, tile_size
 * @return {x:,y:};

 */
Grid.prototype.getPageCoordinates = function(rawX,rawY,opts){
  opts = opts ||{};
  var s = opts.tileSize||this.options.tileSize
    , offset = opts.offset||this.options.offset
    , origin = opts.origin||this.options.origin
    , xt = rawX
    , yt = rawY
    , x = s*xt/2 - s*yt/2 - offset.x +origin.x
    , y = s*xt/4 + s*yt/4 - offset.y +origin.y;
  return {x:x,y:y};
};
/**
 * Get tile Object on map coordinates x,y.
 * @param {iny} x
 * @param {int} y
 * @return {Promise} a promise for a tile
 */
Grid.prototype.getTile = function(x,y){
  if(this.tiles[x]&&this.tiles[x][y]){
    return new Promise(function(resolve, reject) {
        resolve(this.tiles[x][y]);
      });
  }else{
      this.fetchTile(x,y);
  }
};

Grid.prototype.fetchTile = function(x,y){

};

Grid.prototype.set = function(x,y,data){
  if(!this.tiles[x]){
    this.tiles[x] = [];
  }
  this.tiles[x][y] = data;
};
