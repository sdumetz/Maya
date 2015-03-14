var TableCell = require("./TableCell")
  , BatList = require("./BatList");
  , Datastore = require('nedb');


function Model (persist){

  var self = this;
  var neDbOpts = {};
  if(persist){
    neDbOpts.filename = persist;
  }
  this.db = new Datastore(neDbOpts);
  this.size = 10;
  this.table = new Array();
  for (var x = 0; x < this.size;x++){
    self.table[x] = new Array();
    for (var y = 0; y < this.size;y++){
      self.table[x][y] = new TableCell();
    }
  }
  this.BatList = new BatList();
}

Model.prototype.update = function(data,callback){
  if(!callback){callback = function(data){}};
  if(data.cells){
    this.updateCells(data.cells);
  }
  if(data.ressources){
    this.updateRessources(data.ressources);
  }
}
Model.prototype.updateCell = function(cells){
  cells.forEach(function(cell){
  });
}
Model.prototype.updateRessources = function(cells){
  cells.forEach(function(cell){

  });
}

module.exports = Model;
