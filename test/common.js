var chai = require('chai')
  , path = require("path");
chai.config.includeStack = true;
var chaithings = require('chai-things');
chai.use(chaithings);
global.expect = chai.expect;


var Utils = require("../lib/Utils");
global.Utils = Utils;
