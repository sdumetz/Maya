var Ressource = require("./Ressource"); //besoin des datas pour connaitre nombre de batiments de chaque type existant
function RessourceList (){
    this.bois=new Ressource ("bois",10)
    this.mais=new Ressource ("mais",10)
    this.eau=new Ressource ("eau",5)
    this.calcaire=new Ressource ("calcaire",5)
    this.chanvre=new Ressource ("chanvre")
    this.outils=new Ressource("outils")
    this.pigments=new Ressource ("pigments")
    this.bonheur=new Ressource ("bonheur")
}
