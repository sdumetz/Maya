function Model(socket){
  this.socket = socket;
  this.grid_size = 10;

  var self = this;

  this.onUpdate = function(){};//Dummy function, to be replaced by view listener
  this.onGui = function(){}//Same as onUpdate}
  this.tiles = new Array();
  this.batiments;
  this.ressources = null;
  this.fetched = false;
  this.socket.on("import",function(data){
    var loadCount =0;
    data.cases.forEach(function(tile){
      if(!self.tiles[tile.x]){
        self.tiles[tile.x] = new Array();
      }
      self.tiles[tile.x][tile.y] = {content:tile.contenu,id:-1};
    });
    self.batiments = data.batiments;
    self.ressources = data.ressources
    //BEGIN IMAGES SRC REPLACEMENT BY "Image" OBJECT
    Object.keys(self.batiments).forEach(function(name){
      if(self.batiments[name].image){
        self.batiments[name].image.forEach(function(image,index){
          var img = new Image();
          loadCount++;
          img.onLoad = function(){
            loadCount--;
            self.batiments[name].image[index] = img;
          }
          img.onError = function(err){
            console.log("error loading image : ",err);
          }
          img.src = self.batiments[name].image[index];
        })
      }

    })
    self.fetched = function(){return loadCount <= 0};

  })
  //NEver called
  this.socket.on("tiles",function(tiles){
    var self = this;
    tiles.forEach(function(tile){
      tile.image = new createjs.Bitmap(self.batiments[tile.contenu].image[0]);
      self.tiles[tile.x] [tile.y] = tile;
    });
  });
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

  //init model
  this.import();
}



Model.prototype.registerUpdate = function(fn,thisarg){
  this.onUpdate.push({fn:fn,thisarg:thisarg});
}

Model.prototype.update = function(tile){
  /*
  this.onUpdate.forEach(function(ob){
    ob.fn.call(ob.thisarg,tile);
  });
  */
 var id = this.getImageIdByCoordinates(tile.x,tile.y);
 if(id>0){
   this.onUpdate(id,this.getImage(tile.contenu));
 }

}


/**
 * data :
 * tiles : TableCell[]
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

Model.prototype.removeNotIn = function(list){
  var self = this
    , removed = [];
  this.tiles.forEach(function(y,x){
    y.forEach(function(tile){
      if(list.indexOf(tile.id)<0){
        self.remove(x,y);
        removed.push(id);
      }
    })
  })
  return removed;
}

Model.prototype.remove = function(x,y){
  delete this.tiles[x][y];
  if(this.tiles[x].length === 0){
    delete this.tiles[x];
  }
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
  this.tiles.some(function(tile,index){
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
Model.prototype.createMissing = function(x,y){
  var content = {content:"default",id:-1};
  this.tiles[x] = this.tiles[x]||new Array();
  this.tiles[x][y] = content;
  return content;

}

Model.prototype.setTileImageId = function(x,y,id){
  if(this.tiles[x] && this.tiles[x][y]){
    this.tiles[x][y].id = id;
  }else{
    console.log("tile %s,%s does not exist in DB and should not have been displayed. thus it is not supposed to have an ID")
  }

}
Model.prototype.getImageIdByCoordinates = function(x,y){
  if(this.tiles[x] && this.tiles[x][y] && this.tiles[x][y].id !=-1){
    return this.tiles[x][y].id;
  }else{
    return -1;
  }
}
Model.prototype.getImageSrcByCoordinates = function(x,y){
  if(this.tiles[x] && this.tiles[x][y] && this.tiles[x][y].content){
    return this.getImage(this.tiles[x][y].content);
  }else{
    return this.getImage(this.createMissing(x,y).content);
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
