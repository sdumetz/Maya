var Ressource = require("./Ressource"); //besoin des datas pour connaitre nombre de batiments de chaque type existant
function RessourceList (){
<<<<<<< HEAD
    this.bois=new Ressource ("bois",500)
    this.mais=new Ressource ("mais",500)
    this.eau=new Ressource ("eau",500)
    this.calcaire=new Ressource ("calcaire",500)
=======
    this.bois=new Ressource ("bois",10)
    this.mais=new Ressource ("mais",10,true)
    this.eau=new Ressource ("eau",5)
    this.calcaire=new Ressource ("calcaire",5)
>>>>>>> origin/master
    this.chanvre=new Ressource ("chanvre")
    this.outils=new Ressource("outils")
    this.pigments=new Ressource ("pigments")
    this.bonheur=new Ressource ("bonheur")
    this.habitant=new Ressource ("habitant")
}
module.exports = RessourceList;
