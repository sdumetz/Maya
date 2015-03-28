function Ressource (nom,stock,vital){
  this.image = "img/ressources"+nom+".png";
  this.nom = nom;
  this.stock = stock || 0;
  this.vital = vital ||false;
}

module.exports = Ressource;
