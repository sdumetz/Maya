var chai = require('chai')
  , path = require("path");
chai.config.includeStack = true;
var chaithings = require('chai-things');
chai.use(chaithings);
global.expect = chai.expect;



global.Utils = require("../lib/client/Utils");
global.Model = require("../lib/client/Model.js")
global.Sync = require("../lib/client/Sync.js")

/**
 * CreateJs emulation
 */

global.createjs = {
  Bitmap: function(src){
    this.src = src;
    return this;
  }
}
