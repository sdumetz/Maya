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

  this.socket.on("getRessource",function(data){
    data.ressources=db.count({"getRessource"})
  })

  this.socket.on("getPop",function(data){
    this.habitant=db.count({Batiment:maison,Batiment:commerce,Batiment:monument})
  })

  this.socket.on("getImage",function(name){

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

Model.prototype.getRessource=function(data){
  this.socket.emit("getRessource",data)

}
Model.prototype.getPop=function(data){
  this.socket.emit("getPop",data)
}
Model.prototype.getImageByName = function(name){
  return this.batiments[name].image;
}
Model.prototype.getImageByCoordinates = function(x,y){
  var myCase = null;
  this.cases.some(function(case){
    if(x === case.x && y === case.y){
      myCase = case
      return true;
    }else{
      return false;
    }
  })
  return this.batiments[myCase.contenu].image;
}
