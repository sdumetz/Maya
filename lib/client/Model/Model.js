/**
 * Main client Model.
 * Will store tiles values
 */
function Model(options){
  var self = this;
  options = options || {};
  Object.keys(this.options_default).forEach(function(key){
    if(options[key] === undefined){
      this[key] = self.options_default[key];
    }else{
      this[key] = options[key];
    }
  }); //Will use sensible defaults if no options provided

  this.grid = new Grid(this); //This is passed only to pass options properties
}
/**
 * Sensible default options.
 * @type {Object}
 */
Model.prototype.options_default = {
  tileSize: 200,
  offset: {x:0,y:0}, //Offset is always expressed in page coordinates!
  origin:{x:0,y:0}
};
/**
 * Supported format are :
 * - Coordinates
 * @param  {int} x position (map coordinates)
 * @param  {int} y position (map coordinates)
 * @return {Promise}   A promise for a single Tile Object
 * - Array
 * @param  {Object} x center
 * @param  {int} y range
 * @return {Promise}   A promise for an Array of Tile Objects
 */
Model.prototype.getTile = function(x,y) {
  if(typeof x === "number"){
    return this.grid.getTile(x,y);
  }else if(typeof x ==="object" && typeof x.x ==="number" && typeof x.y ==="number"){ //x should be an object of type {x:<int>,y:<int>}
    var sequence = [];
    for(var i = x.x-y;i<=x.x+y;i++){
      for(var j = x.y-y;j<=x.y+y;j++){
        sequence.push(this.grid.getTile(i,j));
      }
    }
    return Promise.all(sequence);
  }
};
Model.prototype.setTile = function(x,y,data) {

  //TODO : validate data
  this.grid.set(x,y,data);
};
