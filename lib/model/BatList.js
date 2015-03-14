var Batiment = require("./Batiment");
function BatList (){
  this.maison = new Batiment({
    name:"maison",
    image: "maison",
    menu: "maison",
    cout:{bois:100,calcaire:50},
    consommation:{mais:20,eau:20},
    production:{prestige:1,habitant:3},
    information: 'La maison loge vos habitants. \
    La construction coûte 100 unités de bois et 50 unités de calcaire. \
    La maison consomme 20 unités de maïs et 20 unités d\'eau. \
    Ce bâtiment fournit 1 unité de prestige et loge 3 habitants. \
    '

    });
  this.commerce= new Batiment({
    name:"commerce",
    image:"commerce",
    menu:"commerce",
    cout:{bois:200, calcaire:100},
    consommation:{chanvre:10,bois:10,eau:20},
    production:{outils:10,habitant:2},
    information:'Le commerce est le bâtiment commercial de votre ville. \
    La construction coûte 200 unités de bois et 100 unités de calcaire. \
    Le commerce consomme 20 unités d\'eau, 10 unités de bois et 10 unités de chanvre. \
    Ce bâtiment produit 10 unités d\'outils et loge 2 habitants. \
    '
    }) ;
  this.monuments= new Batiment({
    name:"monument",
    image: "monument",
    menu: "monument",
    cout: {bois:500,calcaire:300,outils:100,pigments:100;chanvre:100},
    consommation: {mais:40,eau:40},
    production:{prestige:10,habitant:1},
    information:'Le monument est le lieu de culte de votre cité. Elle permet à votre peuple d\'être en communion avec les dieux.\
    La construction coûte 500 unités de bois, 300 unités de calcaire, 100 unités d\'outils, 100 unités de pigments et 100 unités de chanvre.\
    Le monument consomme 40 unités de maïs et 40 unités d\'eau.\
    Ce bâtiment fournit 10 unités de prestige et loge 1 habitant.\
    '
    });
  this.jardin = new Batiment({
    name:"jardin",
    image:"jardin",
    menu:"jardin",
    cout:{bois:500, calcaire:200,outils:100,pigments:200,chanvre:100},
    consommation:{eau:20,pigments:10},
    production:{prestige:10},
    information:'Le jardin est le lieu de rencontre de votre cité. Elle montre le raffinement et l\'art ancestral de votre peuple.\
    La construction coûte 500 unités de bois, 200 unités de calcaire, 200 unités de pigments, 100 unités d\'outils et 100 unités de chanvre .\
    Le jardin consomme 20 unités d\'eau et 10 pigments.\
    Ce bâtiment fournit 10 unités de prestige.\
    '
    });
  this.champs = new Batiment({
    name:"champs",
    image: "champs",
    menu: "champs",
    cout: {bois:120,eau:100},
    consommation:{eau:10},
    production: {mais:20,chanvre:20},
    information: 'Le champs produit de la nourriture pour vos habitants. \
    La construction coûte 120 unités de bois et 100 unités d\'eau. \
    Ce bâtiment produit 20 unités de maïs et 20 unités de chanvre. \
    '
    });
  this.foret = new Batiment({
    name: "foret",
    image: "foret",
    menu: "foret",
    cout:{bois:240,eau:100},
    production: {bois:30},
    information:'La forêt fournit la matière première de votre ville et elle assure la stabilité de votre environnement.\
    La plantation d\'une nouvelle forêt vous coûte 240 unités de bois et 100 unités d\'eau.\
    La forêt produit 30 unités de bois.\
    '
    });
  this.carriere = new Batiment({
    name: "carriere",
    image: "calcaire",
    menu: "calcaire",
    cout: {bois:240,outils:100},
    consommation:{outils:10},
    production: {calcaire:30},
    information: 'La carrière vous permet d\'extraire du calcaire, nécessaire à la construction de vos édifices.\
    La construction coûte 240 unités de bois et 100 unités d\'outils.\
    La carrière produit 30 unités de calcaire.\
    '
    });
  this.atelier = new Batiment({
    name: "atelier",
    image: "pigments",
    menu: "pigments",
<<<<<<< HEAD
    cout:{bois:240,outils:100,calcaire:240},
    consommation:{bois:10,outils:10,chanvre:20,eau:20},
    production:{pigments:20},
    information:'L\'atelier est le bâtiment artisanal de votre ville.\
    La construction coûte 240 unités de bois, 240 unités de calcaire et 100 unités d\'outils.\
    Le bâtiment produit 20 unités de pigments.\
    '
    });
  this.prairie = new Batiment({
    name:"prairie",
    image:"prairie",
    menu:"prairie",
    information:'La prairie est le terrain vierge. Ce terrain peut être constructible mais également exploité pour vos ressources.'
    });
  this.lac = new Batiment ({
    name:"lac",
    image:"lac",
    menu:"lac",
    cout:{bois:200,calcaire:150,outils:100},
    production:{eau:40},
    information:'le lac permet à votre peuple de prélever de l\'eau. Un lac artificiel peut être crée grâce à un astucieux réseau de canaux.\
    La construction d\'un lac artificel coûte 200 unités de bois, 150 unités de calcaire et 100 unités d\'outils.\
    Le lac fournit 40 unités d\'eau.\
    '

  })

}

module.exports = BatList;
