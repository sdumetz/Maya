var path = require("path")
  , TableCell = require("./TableCell")
  , BatList = require("./BatList")
  , RessourceList = require("./RessourceList")
  , Datastore = require('nedb');


function Model (persist){

  var self = this;
  var neDbOpts = {};
  if(persist){
    neDbOpts.filename = persist;
  }
  this.db = new Datastore(neDbOpts);
  this.batlist = new BatList();
  this.ressources = new RessourceList();
  this.size = 10;
  this.init =0;
  this.batlist.loadImages(path.join(__dirname,"../../public/img/"),function(err){
    self.init++;
  })
  for(var i =1;i<=this.size;i++){
    for (var j=1;j<=this.size;j++){
      this.db.insert(new TableCell(i,j,"prairie"),function(err,doc){
        self.init ++;
      });
    }
  }

}

Model.prototype.ready = function(){
  return this.init === this.size*this.size+1
}
Model.prototype.updateCell = function(cell,callback){
  var self = this
    , cost
    , authorized = false
    , updatedRessources;
  this.db.find({x:cell.x,y:cell.y},function(err,oldCell){
    if(err){
      console.log("model:updateCell :"+err);
    }
    if(oldCell.length !=1){
      console.log("should find exactly 1 cell per request. Found :"+doc.length);
    }
    cost = self.getCost(oldCell.contenu,cell.contenu);
    var updatedRessources  = self.ressources;
    authorized = Object.keys(cost).every(function(key){
      if(!self.ressources[key].stock || cost[key] > self.ressources[key].stock){
        return false;
      }else{
        updatedRessources[key].stock-= cost[key];
        return true;
      }
    });
    if(authorized){
      self.ressources = updatedRessources;
      self.db.update({x:cell.x,y:cell.y},cell,function(err, numReplaced){
        if(err ||numReplaced !=1){
          console.log("model:udpateCell - db update (%s): %s",numReplaced,err)
        }
        callback(err,cell);
      })
    }else{
      callback("unauthorized transaction",null);
    }

  })
}

Model.prototype.getCost = function(oldBat,newBat){
  if(this.batlist[newBat]){
    return this.batlist[newBat].cout;
  }else{
    return {};
  }

}

Model.prototype.updateRessources = function(tile){
  var self = this;
  var conso = this.batlist[tile.contenu].consommation;
  var prod = this.batlist[tile.contenu].production;
  if(conso){
    Object.keys(conso).every(function(key){
      self.ressources[key].stock -= conso[key];
      return true;
    });
  }
  if(prod){
    Object.keys(prod).every(function(key){
      self.ressources[key].stock += prod[key];
      return true;
    });
  }

}

Model.prototype.fetch = function(callback){
  var self = this;
  this.db.find({},function(err,doc){
    callback(err,{cases:doc,ressources:self.ressources,batiments:self.batlist})

  });
}

Model.prototype.findCell = function(x,y,callback){
  this.db.find({x:x,y:y},callback)
}

module.exports = Model;
