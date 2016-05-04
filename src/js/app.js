/* ===================================================
* Author: Sarah E. Frostenson
* sarah.e.frostenson@gmail.com
* ===================================================
*/

// Call external dependencies
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var foundation = require('foundation-sites');
$(document).foundation();

var AudioView = require('./views/AudioView.js');
var audioView = new AudioView();