// Call external dependencies
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var foundation = require('foundation');
$(document).foundation();

var AudioView = require('./views/AudioView.js');
var AppRouter = require('./router.js');


$(document).ready(function() {
  var router = new AppRouter();
  Backbone.history.start();
});
