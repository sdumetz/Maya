function Ressource (nom,stock){
  this.image = "img/ressources"+nom+".jpg";
  this.nom = nom;
  this.stock = stock || 0;
}

module.exports = Ressource;
