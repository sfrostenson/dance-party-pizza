var Backbone = require('backbone');
var _ = require('lodash');
var AudioView = require('./views/AudioView.js');

var AppRouter = Backbone.Router.extend({
  initialize: function() {
    var audioView = new AudioView();
  }
});

module.exports = AppRouter;
