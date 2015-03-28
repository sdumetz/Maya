var path = require("path")
  , TableCell = require("./Shared/TableCell")
  , BatList = require("./Shared/BatList")
  , RessourceList = require("./Shared/RessourceList")
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
  /*
  for(var i =0;i<this.size;i++){
    for (var j=0;j<this.size;j++){
      this.db.insert(new TableCell(i,j,"prairie"),function(err,doc){
        self.init ++;
      });
    }
  }//*/

}

Model.prototype.ready = function(){
  //return this.init === this.size*this.size+1
  return true;
}
Model.prototype.updateCell = function(cell,callback){
  var self = this
    , cost
    , authorized = false
    , updatedRessources;

  cost = self.getCost(cell.content);
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
    self.db.update({x:cell.x,y:cell.y},cell,{upsert:true},function(err, numReplaced){
      if(err ||numReplaced !=1){
        console.log("model:udpateCell - db update (%s): %s",numReplaced,err)
      }
      callback(err,cell);
    })
  }else{
    callback("unauthorized transaction",null);
  }
}

Model.prototype.getCost = function(newBat){
  if(this.batlist[newBat]){
    return this.batlist[newBat].cout;
  }else{
    return {};
  }

}

Model.prototype.updateRessources = function(tile){
  var self = this;
  var conso = this.batlist[tile.content].consommation;
  var prod = this.batlist[tile.content].production;
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
