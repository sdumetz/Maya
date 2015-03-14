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
  this.batlist = new BatList();
  this.ressources = null;
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
    if(doc.length !=1){
      console.log("should find exactly 1 cell per request. Found :"+doc.length);
    }
    cost = getCost(oldCell.contenu,newCell.contenu);
    udpatedRessources = self.ressources;
    authorized = Object.keys(cost).every(function(key){
      if(!self.ressources[key] || cost[key] > self.ressources[key]){
        return false;
      }else{
        updatedRessources[key]-= cost[key];
        return true;
      }
    });
    //Transaction is valid
    self.ressources = updatedRessources;
    this.db.update({x:cell.x,y:cell.y},cell,function(err, numReplaced, newDoc){
      if(err ||numReplaced !=1){
        console.log("model:udpateCell - db update (%s): %s",numReplaced,err)
      }
      this.findAll(callback);
    })
  })
}

Model.prototype.getCost = function(oldBat,newBat){
  this.batlist[newBat].cout;
}

Model.prototype.updateRessources = function(ressources){
  ressources.forEach(function(cell){

  })
}

Model.prototype.fetch = function(callback){
  var self = this;
  db.findAll(function(err,doc){
    callback(err,{cases:doc,ressources:self.ressources,batiments:self.batlist})
  });
}

Model.prototype.findCell = function(x,y,callback){
  this.db.find({x:x,y:y},callback)
}

module.exports = Model;
