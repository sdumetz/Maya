var Batiment = require("./Batiment");
function BatList (){
  this.maison = new Batiment({
    name:"maison",
    image: "maison",
    menu: "maison",
    cout:{bois:3,calcaire:1},
    consommation:{mais:1,eau:1},
    information: "maison"

    });
  this.commerce= new Batiment({
    name:"commerce",
    image:"commerce",
    menu:"commerce",
    cout:{bois:5, calcaire:2},
    consommation:{chanvre:1},
    production:{outils:1},
    information:"commerce"

    }) ;
  this.monuments= new Batiment({
    name:"monument",
    image: "monument",
    menu: "monument",
    cout: {bois:10,calcaire:5,outils:5,pigments:5},
    consommation: {mais:2,eau:2},
    production:{bonheur:1},
    information:"monument"
    });
  this.jardin = new Batiment({
    name:"jardin",
    image:"jardin",
    menu:"jardin",
    cout:{bois:5, calcaire:2,outils:4,pigments:6},
    consommation:{eau:2},
    production:{bonheur:1}
    });
  this.champs = new Batiment({
    name:"champs",
    image: "champs",
    menu: "champs",
    cout: {bois:1,eau:1},
    production: {mais:1,chanvre:1},
    information: "champs"
    });
  this.foret = new Batiment({
    name: "foret",
    image: "foret",
    menu: "foret",
    production: {bois:2},
    information:"foret"
    });
  this.carriere = new Batiment({
    name: "carriere",
    image: "calcaire",
    menu: "calcaire",
    cout: {bois:2},
    production: {calcaire:1},
    information: "calcaire"
    });
  this.atelier = new Batiment({
    name: "atelier",
    image: "pigments",
    menu: "pigments",
    cout:{bois:5,calcaire:2,outils:4},
    production:{pigments:2},
    information:"pigments"
    });

}

module.exports = BatList;
