var path = require('path');
function Batiment (options){
  this.name = options.name
  this.image = [];
  this.menu = "img/"+options.name+"-menu.png";
  this.cout = options.cout;
  this.consommation = options.consommation;
  this.production = options.production;
  this.information = options.information;
  this.init = false;
}

Batiment.prototype.addImages = function(files,prefix){
  var self = this
    , reg = new RegExp(this.name+'(\.?[0-9]*)?\.png',"i")
    , pre = prefix||"img/";
  files.forEach(function(file){
    if(reg.test(file)){
      self.image.push(path.join(pre,file));
    }
  })
}
module.exports = Batiment;
