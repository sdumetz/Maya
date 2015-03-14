function Ressource (nom,stock){
  this.image = "img/ressources"+nom+".png";
  this.nom = nom;
  this.stock = stock || 0;
}

module.exports = Ressource;
