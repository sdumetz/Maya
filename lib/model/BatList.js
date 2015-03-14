var Batiment = require("./Batiment");
function BatList (){
  this.maison = new Batiment({
    name:"maison",
    image: "maison",
    menu: "maison",
    cout:{bois:100,calcaire:50},
    consommation:{mais:20,eau:20},
    production:{bonheur:1,habitant:3},
    information: 'La maison loge vos habitants. \
    La construction coûte 3 unités de bois et 1 unité de calcaire. \
    La maison consomme 1 unité de maïs et 1 unité d\'eau. \
    Ce bâtiment fournit 1 unité de bonheur et loge 3 habitants. \
    '

    });
  this.commerce= new Batiment({
    name:"commerce",
    image:"commerce",
    menu:"commerce",
    cout:{bois:200, calcaire:100},
    consommation:{chanvre:10,bois:10,eau:20},
    production:{outils:10,habitant:2},
    information:'Le commerce est le bâtiment commercial de votre ville.\
    La construction coûte 5 unités de bois et 2 unités de calcaire.\
    Le commerce consomme 1 unité de chanvre.\
    Ce bâtiment produit 1 unité d\'outils et loge 2 habitants.\
    '

    }) ;
  this.monuments= new Batiment({
    name:"monument",
    image: "monument",
    menu: "monument",
    cout: {bois:500,calcaire:300,outils:100,pigments:100,chanvre:100},
    consommation: {mais:40,eau:40},
    production:{bonheur:10,habitant:1},
    information:'Le monument est le lieu de culte de votre cité. Elle permet à votre peuple d\'être en communion avec les dieux.\
    La construction coûte 10 unités de bois, 5 unités de calcaire, 5 unités d\'outils et 5 unités de pigments.\
    Le monument consomme 2 unités de maïs et 2 unités d\'eau.\
    Ce bâtiment fournit 10 unités de bonheur et loge 1 habitant.\
    '
    });
  this.jardin = new Batiment({
    name:"jardin",
    image:"jardin",
    menu:"jardin",
    cout:{bois:500, calcaire:200,outils:100,pigments:200,chanvre:100},
    consommation:{eau:20,pigments:10},
    production:{bonheur:10},
    information:'Le jardin est le lieu de rencontre de votre cité. Elle montre le raffinement et l\'art ancestral de votre peuple.\
    La construction coûte 5 unités de bois, 2 unités de calcaire,4 unités d\'outils et 6 unités de pigments.\
    Le jardin consomme 2 unités d\'eau.\
    Ce bâtiment fournit 10 unités de bonheur.\
    '
    });
  this.champs = new Batiment({
    name:"champs",
    image: "champs",
    menu: "champs",
    cout: {bois:120,eau:100},
    consommation:{eau:10},
    production: {mais:20,chanvre:20},
    information: 'Le champs produit de la nourriture pour vos habitants.\
    La construction coûte 1 unité de bois et 1 unité d\'eau.\
    Ce bâtiment produit 1 unité de maïs et 1 unité de chanvre.\
    '
    });
  this.foret = new Batiment({
    name: "foret",
    image: "foret",
    menu: "foret",
    cout:{bois:240,eau:100},
    production: {bois:30},
    information:'La forêt fournit la matière première de votre ville et elle assure la stabilité de votre environnement.\
    La plantation d\'une nouvelle forêt vous coûte 1 unité de bois et 1 unité d\'eau.\
    L\'abattage de la forêt produit 2 unités de bois.\
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
    La construction coûte 2 unité de bois.\
    La carrière produit 2 unités de calcaire.\
    '
    });
  this.atelier = new Batiment({
    name: "atelier",
    image: "pigments",
    menu: "pigments",
    cout:{bois:240,outils:100,calcaire:240},
    consommation:{bois:10,outils:10,chanvre:20,eau:20},
    production:{pigments:20},
    information:'L\'atelier est le bâtiment artisanal de votre ville.\
    La construction coûte 5 unités de bois, 2 unités de calcaire et 4 unités d\'outils.\
    Le bâtiment produit 2 unités de pigments.\
    '
    });
  this.prairie = new Batiment({
    name:"prairie",
    image:"prairie",
    menu:"prairie",
    information:'La prairie est le terrain vierge. Ce terrain peut être constructible mais également exploité pour vos ressources'
  });
  this.lac = new Batiment ({
    name:"lac",
    image:"lac",
    menu:"lac",
    cout:{bois:200,calcaire:150,outils:100},
    production:{eau:40},
    information:'le lac permet à votre peuple de prélever de l\'eau. Un lac artificiel peut être crée grâce à un astucieux réseau de canaux.\
    La construction d\'un lac artificel coûte 1 unité de bois, 1 unité de calcaire et 2 unités d\'outils.\
    Le lac fournit 2 unités d\'eau.\
    '

  })

}

module.exports = BatList;
