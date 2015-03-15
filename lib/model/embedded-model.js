function Model(socket){
  this.socket = socket;
  this.grid_size = 20;

  var self = this;

  this.onUpdate = function(){};//Dummy function, to be replaced by view listener
  this.onGui = function(){}//Same as onUpdate}
  this.cases = [];
  this.batiments;
  this.ressources = null;
  this.fetched = false;
  this.socket.on("import",function(data){
    self.cases = data.cases;
    self.batiments = data.batiments;
    self.ressources = data.ressources
    self.fetched = true;
  })

  this.socket.on("update",function(data){
    console.log("got update :",data)
    if(Array.isArray(data.tile)){
      data.tile.forEach(function(tile){
        self.update(tile);
      })
    }else{
      self.update(data.tile);
    }
    if(data.ressources){
      self.ressources = data.ressources;
      self.onGui();
    }
  })
  this.socket.on("routine",function(data){
    self.ressources = data.ressources;
    self.onGui();
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
Model.prototype.getTileByDOMId = function(id){
  var mytile = null
    , index = -1
    , id = id.split("x")
    , x = id[0]
    , y = id[1];

  return this.getTileByCoordinates(x,y);
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
  if(myCase && myCase.contenu){
    return this.getImage(myCase.contenu);
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
  var images = this.batiments[name].image;
  if(Array.isArray(images)){
    if(images.length >0){
      return images[Math.floor(Math.random()*images.length)];
    }else{
      return null;
    }
  }else{
    return images;
  }

}
module.exports = Model;
