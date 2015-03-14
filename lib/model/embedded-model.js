function Model(){
  var self = this;
  this.socket = io.connect('http://localhost:8080');
  this.onUpdate = [];
  this.cases = [];
  this.batiments;
  this.ressources;
  this.fetched = false;
  this.socket.on("import",function(data){
    self.cases = data.cases;
    self.batiments = data.batiments;
    self.ressources = data.ressources
    self.fetched = true;
  })

  this.socket.on("update",function(data){
    console.log("got update :",data)
    if(Array.isArray(data)){
      data.forEach(function(tile){
        self.update(tile);
      })
    }else{
      self.update(data);
    }

  })

  this.socket.on("getRessource",function(data){
    //data.ressources=db.count({"getRessource"})
  })

  //init model
  // modif vue, méthode model.prototype.update avec coordonnée de cases et changement de case avec le batiment dessus
  this.import();

}
Model.prototype.registerUpdate = function(fn,thisarg){
  this.onUpdate.push({fn:fn,thisarg:thisarg});
}
Model.prototype.update = function(tile){
  if(tile._id){
    this.cases[this.getTileIndexById(tile._id)]= tile;
  }else{
    var index = this.getTileIndexByCoordinates(tile.x,tile.y);
    if(index>0){
      this.cases[index]= tile;
    }
  }
  /*
  this.onUpdate.forEach(function(ob){
    ob.fn.call(ob.thisarg,tile);
  });
  */
 this.onUpdate(tile);
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

Model.prototype.change = function(tile){
  console.log("requesting change for : ",tile)
  this.socket.emit("change",tile)
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

Model.prototype.getTileByCoordinates = function(x,y){
  var mytile = null;
  var index = -1;
  this.cases.some(function(tile,index){
    if(x == tile.x && y == tile.y){
      mytile = tile;
      index = index;
      return true;
    }else{
      return false;
    }
  })

  return mytile;
}
Model.prototype.getTileIndexByCoordinates = function(x,y){
  var mytile = null;
  var index = -1;
  this.cases.some(function(tile,index){
    if(x == tile.x && y == tile.y){
      mytile = tile;
      index = index;
      return true;
    }else{
      return false;
    }
  })

  return index;
}
Model.prototype.getTileById = function(id){
  return this.cases[this.getTileIndexById(id)];
}
Model.prototype.getTileIndexById = function(id){
  var res = -1;
  var out = $.grep(this.cases,function(el,index){
    if(el._id && el._id === id){
      res=index;
      return true;
    }else{
      return false;
    }
  });
  if(out.length>0){
    return res;
  }else{
    return -1;
  }

}
Model.prototype.getImageByCoordinates = function(x,y){
  var myCase = this.getTileByCoordinates(x,y);
  if(myCase && myCase.contenu && this.batiments[myCase.contenu]){
    return this.batiments[myCase.contenu].image;
  }else{
    console.log("error : invalid tile (%s, %s) : %s",x,y,myCase.contenu);
    return null;
  }

}
Model.prototype.getImage = function(name){
  if(!this.batiments[name]){
    console.log("batiment invalide : ",name);
    return null;
  }
  return this.batiments[name].image;
}
module.exports = Model;
