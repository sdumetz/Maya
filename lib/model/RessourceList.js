var Ressource = require("./Ressource"); //besoin des datas pour connaitre nombre de batiments de chaque type existant
function RessourceList (){
    this.bois=new Ressource ("bois",500)
    this.mais=new Ressource ("mais",500,true)
    this.calcaire=new Ressource ("calcaire",500)
    this.outils=new Ressource("outils",500)
    this.prestige=new Ressource ("prestige")
    this.habitant=new Ressource ("habitant")
}
module.exports = RessourceList;
