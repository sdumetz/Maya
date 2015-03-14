
function Batiment (options){
  this.image = "img/"+options.image+".jpg";
  this.menu = "img/"+options.image+"-menu.jpg";
  this.cout = options.cout;
  this.consommation = options.consommation;
  this.production = options.production;
  this.information = options.information;

}

module.exports = Batiment;
