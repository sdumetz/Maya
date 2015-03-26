var Batiment = require("./Batiment")
  , fs = require("fs")
  , path = require("path");
function BatList (){
  this.maison = new Batiment({
    name:"maison",
    cout:{bois:100,calcaire:50},
    consommation:{mais:20},
    production:{prestige:1,habitant:5},
    information: 'La maison loge vos habitants. \
    La construction coûte 100 unités de bois et 50 unités de calcaire. \
    La maison consomme 20 unités de maïs et 20 unités d\'eau. \
    Ce bâtiment fournit 1 unité de prestige et loge 3 habitants. \
    '
    });
  this.commerce= new Batiment({
    name:"commerce",
    cout:{bois:200, calcaire:100},
    consommation:{bois:10,calcaire:10},
    production:{outils:30},
    information:'Le commerce est le bâtiment commercial de votre ville. \
    La construction coûte 200 unités de bois et 100 unités de calcaire. \
    Le commerce consomme 10 unités de bois et 10 unités de calcaire. \
    Ce bâtiment produit 30 unités d\'outils. \
    '
    }) ;
  this.monument= new Batiment({
    name:"monument",

    cout: {bois:500,calcaire:300,outils:100},
    consommation: {mais:40},
    production:{prestige:10},
    information:'Le monument est le lieu de culte de votre cité. Elle permet à votre peuple d\'être en communion avec les dieux.\
    La construction coûte 500 unités de bois, 300 unités de calcaire, 100 unités d\'outils.\
    Le monument consomme 40 unités de maïs.\
    Ce bâtiment fournit 10 unités de prestige.\
    '
    });
  this.jardin = new Batiment({
    name:"jardin",

    cout:{bois:500, calcaire:200,outils:100},
    consommation:{bois:10},
    production:{prestige:10},
    information:'Le jardin est le lieu de rencontre de votre cité. Elle montre le raffinement et l\'art ancestral de votre peuple.\
    La construction coûte 500 unités de bois, 200 unités de calcaire, 100 unités d\'outils.\
    Le jardin consomme 10 unités de bois.\
    Ce bâtiment fournit 10 unités de prestige.\
    '
    });
  this.champs = new Batiment({
    name:"champs",

    cout: {bois:120, outils:100},
    consommation:{bois:10,outils:10},
    production: {mais:20},
    information: 'Le champs produit de la nourriture pour vos habitants. \
    La construction coûte 120 unités de bois et 100 unités d\'outils. \
    Le champs consomme 10 unités de bois et 10 unités d\'outils.\
    Ce bâtiment produit 20 unités de maïs. \
    '
    });
  this.foret = new Batiment({
    name: "foret",
    cout:{bois:240,calcaire:100},
    production: {bois:30},
    information:'La forêt fournit la matière première de votre ville et elle assure la stabilité de votre environnement.\
    La plantation d\'une nouvelle forêt vous coûte 240 unités de bois et 100 unités de calcaire.\
    La forêt produit 30 unités de bois.\
    '
    });
  this.carriere = new Batiment({
    name: "carriere",
    cout: {bois:240,outils:100},
    consommation:{outils:10},
    production: {calcaire:30},
    information: 'La carrière vous permet d\'extraire du calcaire, nécessaire à la construction de vos édifices.\
    La construction coûte 240 unités de bois et 100 unités d\'outils.\
    La carrière consomme 10 unités d\'outils.\
    La carrière produit 30 unités de calcaire.\
    '
  });
  this.default = new Batiment({
    name:"default",
    information:'La prairie est le terrain vierge. Ce terrain peut être constructible mais également exploité pour vos ressources.'
  });
  this.prairie = new Batiment({
    name:"prairie",
    information:'La prairie est le terrain vierge. Ce terrain peut être constructible mais également exploité pour vos ressources.'
  });
  this.listArray = Object.keys(this);


}
BatList.prototype.loadImages = function(imgDir,callback){
  var self = this
    , dir = imgDir || path.join(__dirname,"../../public/img/");

  fs.readdir(path.join(dir),function(err,files){
    if(err){
      console.log("Bat List loadImages:",err);
    }
    self.listArray.forEach(function(el){
      if(typeof self[el].addImages === "function"){
        self[el].addImages(files);
      }else{
        console.log("for : %s, addImages is :%s",el,typeof self[el].addImages)
      }
    })
    return callback(err);
  })
}

module.exports = BatList;
