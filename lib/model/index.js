var TableCell = require("./TableCell")
  , BatList = require("./BatList")
  , Datastore = require('nedb');


function Model (persist){

  var self = this;
  var neDbOpts = {};
  if(persist){
    neDbOpts.filename = persist;
  }
  this.db = new Datastore(neDbOpts);
  this.size = 10;
  //TODO Create CELL array in NEDB
  //
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

Model.prototype.findCell = function(){
  console.log("todo : find cell")
}

module.exports = Model;
