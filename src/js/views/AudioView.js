'use strict';

var $ = require('jquery');
var paper = require('paper');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#audioView',

  events: {
    'click #playBtn': 'play',
    'click #pauseBtn': 'pause',
    'change #audioInput': 'useInputSource',
    'click #micBtn': 'useStreamSource',
    'click #defaultBtn': 'useDefaultSource'
  },

  initialize: function() {
    // Find the audio and canvas elements
    this.defaultAudio = this.$el.find('#audioElement')[0];
    // this.audio = this.$el.find('#emptyAudio')[0];
    this.canvas = this.$el.find('#audioCanvas')[0];

    // Create a new audio context
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    
    // this.render();
    if (!this.audio) this.useDefaultSource();
    else this.render();
  },
  
  useInputSource: function(e) {
    var file = e.currentTarget.files[0];
    
    var objectUrl = URL.createObjectURL(file);
    $('#emptyAudio').prop('src', objectUrl);
    this.audio = $('#emptyAudio')[0];
    
    this.analyser = this.ctx.createAnalyser();
    this.src = this.ctx.createMediaElementSource(this.audio);
    
    // Bind our analyser to the media element source.
    this.src.connect(this.analyser);
    this.src.connect(this.ctx.destination);
    this.render();
  },
  
  useStreamSource: function() {
    var self = this;
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || navigator.msGetUserMedia);
    
    if (!navigator.getUserMedia) {
      window.alert('This functionality is not supported :(');
    }

    navigator.getUserMedia({
      audio: true
    }, function(stream) {
      self.src = self.ctx.createMediaStreamSource(stream);
      
      // THIS DOESN'T WORK YET
      self.analyser = self.ctx.createAnalyser();
      
      self.src.connect(self.analyser);
      self.src.connect(self.ctx.destination);
      self.render();
    }, function(err) {
      console.log(err);
    });
  },
  
  useDefaultSource: function() {
    // Pipe in the audio source and create an analyser
    this.src = this.ctx.createMediaElementSource(this.defaultAudio);
    this.analyser = this.ctx.createAnalyser();
    
    // Bind our analyser to the media element source.
    this.src.connect(this.analyser);
    this.src.connect(this.ctx.destination);
    this.render();
  },

  render: function() {
    console.log('rendering...');
    // Pass the canvas element to PaperJS
    paper.setup(this.canvas);

    // Draw a new path within the canvas element
    this.mainPath = new paper.Path({
      strokeColor: 'blue',
      opacity: 0.5
    });
    
    this.residualPath = new paper.Path({
      strokeColor: 'blue',
      opacity: 0.25
    });
    
    // The length of the path will equal the frequency bin count (1024)
    this.pathLength = this.analyser.frequencyBinCount;
    // The width of the canvas matches this number
    $(this.canvas).width(this.pathLength);

    // Add a new point to the line at every sixty-fourth pixel
    for (var i = 0; i < this.pathLength / 16; i++) {
      this.mainPath.add(new paper.Point(i * 16, 0));
      this.residualPath.add(new paper.Point(i * 16, 0));
    }

    // In order for the path to be a path, group its points and position them
    this.group = new paper.Group({
      children: [this.mainPath, this.residualPath],
      applyMatrix: false,
      strokeWidth: 16,
      strokeJoin: 'round',
      strokeCap: 'round',
      pivot: this.mainPath.position,
      position: paper.view.center
    });

    // Call Paper's draw function to actually show the path
    paper.view.draw();
    return this;
  },

  play: function() {
    var self = this;
    var audio = this.audio;
    if (audio) audio.play();
    else this.defaultAudio.play();
    
    // TO DO: be able to call various animations from here
    // Bind and unbind animations as needed in this and pause function
    
    // On play, get the frequency bin count (1024) from the analyser,
    // divide by 16 for a more manageable number (16)
    var frequencies = new Uint8Array(this.analyser.frequencyBinCount / 16);

    paper.view.onFrame = function() {
      self.analyser.getByteFrequencyData(frequencies);
      
      // Move the line as frequency changes
      for (var i = 0; i < self.pathLength / 16; i++) {
        self.mainPath.segments[i].point = [i * 16, -frequencies[i]];
        self.residualPath.segments[i].point = [i * 16, -frequencies[i] - 16];
      }
      
      self.mainPath.smooth();
      self.residualPath.smooth();
    }
  },

  pause: function() {
    var audio = this.audio;
    if (audio) audio.pause();
    else this.defaultAudio.pause();

    paper.view.pause();

    // TO DO: animate back to flat line on pause
  }
});
