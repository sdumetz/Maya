function Model(){
  var self = this;
  this.socket = io.connect('http://localhost:8080');
  this.cases;
  this.batiments;
  this.ressources;

  this.socket.on("import",function(data){
    self.cases = data.cases;
    self.batiments = data.batiments;
    self.ressources = data.ressources
  })

  this.socket.on("update",function(data){
    this.cases=data

  })

  //init model
  // modif vue, méthode model.prototype.update avec coordonnée de cases et changement de case avec le batiment dessus
  this.import();

}
/**
 * data :
 * cases : TableCell[]
 * batiments : BatList
 * ressources : ressources
 */
Model.prototype.import = function(){
  this.socket.emit("import");
}
Model.prototype.update = function (data){
  this.socket.emit("update",data);
}

module.exports = Model;
