'use strict';

var $ = require('jquery');
var paper = require('paper');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#audioView',

  events: {
    'click #playBtn': 'play',
    'click #pauseBtn': 'pause'
  },

  initialize: function() {
    // Find the audio and canvas elements
    this.audio = this.$el.find('#audioElement')[0];
    this.canvas = this.$el.find('#audioCanvas')[0];

    // Create a new audio context
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Pipe in the audio source and create an analyser
    this.src = this.ctx.createMediaElementSource(this.audio);
    this.analyser = this.ctx.createAnalyser();

    // Bind our analyser to the media element source.
    this.src.connect(this.analyser);
    this.src.connect(this.ctx.destination);
    this.render();
  },

  render: function() {
    // Pass the canvas element to PaperJS
    paper.setup(this.canvas);

    // Draw a new path within the canvas element
    this.path = new paper.Path({
      strokeColor: 'blue',
      opacity: 0.5
    });

    // The length of the path will equal the frequency bin count (1024)
    this.pathLength = this.analyser.frequencyBinCount;
    // The width of the canvas matches this number
    $(this.canvas).width(this.pathLength);

    // Add a new point to the line at every sixty-fourth pixel
    for (var i = 0; i < this.pathLength / 16; i++) {
      this.path.add(new paper.Point(i * 16, 0));
    }

    // In order for the path to be a path, group its points and position them
    this.group = new paper.Group({
      children: [this.path],
      applyMatrix: false,
      strokeWidth: 20,
      strokeJoin: 'round',
      strokeCap: 'round',
      pivot: this.path.position,
      position: paper.view.center
    });

    // Call Paper's draw function to actually show the path
    paper.view.draw();
    return this;
  },

  play: function() {
    var self = this;
    this.audio.play();

    // On play, get the frequency bin count (1024) from the analyser,
    // divide by 16 for a more manageable number (16)
    var frequencies = new Uint8Array((this.analyser.frequencyBinCount / 16));

    paper.view.onFrame = function() {
      self.analyser.getByteFrequencyData(frequencies);

      // Move the line as frequency changes
      for (var i = 0; i < self.pathLength / 16; i++) {
        console.log(frequencies[i]);
        self.path.segments[i].point = [i * 16, -frequencies[i]];
      }

      self.path.smooth();
    }
  },

  pause: function() {
    this.audio.pause();
    paper.view.pause();

    // TO DO: animate back to flat line on pause
  }
});
