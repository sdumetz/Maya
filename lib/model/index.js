var TableCell = require("./TableCell")
  , BatList = require("./BatList");

function Model (){
  var self = this;
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

}
Model.prototype.updateCell = function(cells){
  cells.forEach(function(cell){

  });
}

module.exports = Model;
