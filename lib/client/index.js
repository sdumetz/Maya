var Model = require("../model/embedded-model.js")
  , View = require("./view")


/*******************************
 * base components declaration *
********************************/


$(document).ready(function(){
  var model = new Model()
    , view = new View(model);
  var onInit = function(){
    if(model.fetched){
      view.init();
    }else{
      setTimeout(onInit, 10);
    }
  }
  onInit();


})
