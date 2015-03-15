var Ressource = require("./Ressource"); //besoin des datas pour connaitre nombre de batiments de chaque type existant
function RessourceList (){
    this.bois=new Ressource ("bois",2000)
    this.mais=new Ressource ("mais",2000,true)
    this.calcaire=new Ressource ("calcaire",2000)
    this.outils=new Ressource("outils",2000)
    this.prestige=new Ressource ("prestige")
    this.habitant=new Ressource ("habitant")
}
module.exports = RessourceList;
