var Ressource = require("./Ressource"); //besoin des datas pour connaitre nombre de batiments de chaque type existant
function RessourceList (){
    this.bois=new Ressource ("bois",500)
    this.mais=new Ressource ("mais",500,true)
    this.eau=new Ressource ("eau",500)
    this.calcaire=new Ressource ("calcaire",500)
    this.chanvre=new Ressource ("chanvre")
    this.outils=new Ressource("outils")
    this.pigments=new Ressource ("pigments")
    this.prestige=new Ressource ("prestige")
    this.habitant=new Ressource ("habitant")
}
module.exports = RessourceList;
