
function Batiment (options){
  this.image = "img/"+options.image+".png";
  this.menu = "img/"+options.image+"-menu.png";
  this.cout = options.cout;
  this.consommation = options.consommation;
  this.production = options.production;
  this.information = options.information;

}

module.exports = Batiment;
