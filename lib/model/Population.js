function Population (nom,stock){
  this.image = "img/habitant.png";
  this.nom = nom;
  this.stock = stock || 0;
}

module.exports = Population;
