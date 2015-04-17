define(['config', 'waveform', 'level'], function (Config, Waveform, Level) {

  this.elements = [];
  var $boilerPlate = {};

  this.levelUp = function() {
    if(Config.level != Level.length - 1) {
      Config.level++;
      reset();
    }
  };

  this.reset = function () {
    this.elements = $('.source');
    var waveform = [];
    for (var i = 0; i < Level[Config.level].columns.count; i++) {
      waveform[i] = Math.round(Math.random() * 200) - 100;
    }
    waveform = Waveform.generate(Level[Config.level]);

    $('.ie').append('<canvas id="boilerPlate"></canvas>');
    $boilerPlate = $('#boilerPlate');
    $boilerPlate.attr('height', $(window).height())
      .attr('width', $(window).width());
    $boilerPlateCtx = $boilerPlate[0].getContext('2d');

    renderText($boilerPlateCtx);

    shift($boilerPlateCtx, waveform);
    waveform = waveform.map(function (value) {
      return value * -1;
    });
    this.elements.each(function (index) {
      random = Math.floor(Math.random() * waveform.length);

      Config.waveforms[index] = offset(waveform, random);
      //Config.waveforms[index] = $.merge(waveform.slice(0, random),
      //  waveform.slice(random, waveform.length));
    });
  };

  this.renderText = function (ctx) {
    var $backgroundCanvas = $('#backgroundCanvas');
    var $window = $(window);
    $backgroundCanvas.attr('height', $window.height())
      .attr('width', $window.width());
    var backgroundCtx = $backgroundCanvas[0].getContext('2d');
    backgroundCtx.rect(0, 0,$boilerPlate.attr('width'), $boilerPlate.attr('height'));
    backgroundCtx.fillStyle = 'black';
    backgroundCtx.fill();
    backgroundCtx.font = "900 200px Raleway";
    backgroundCtx.textAlign = "center";
    backgroundCtx.fillStyle = 'white';
    backgroundCtx.fillText(Level[Config.level].word,($window.width() / 2),
      (0.72 * ($window.width() * (9 / 16)) + Config.offset.y) * Config.stretch.y);
    ctx.drawImage($backgroundCanvas[0], 0, 0, $window.width(), $window.height());
  };

  this.render = function (data) {
    self = this;
    this.elements.each(function (index) {
      $(self.elements[index])[0].getContext('2d').drawImage($boilerPlate[0], 0, 0);
      waveform = offset(Config.waveforms[index], map_int(data[index], Level[Config.level].columns.count));
      shift($(self.elements[index])[0].getContext('2d'), waveform);
    });
  };

  //based on arduino map function
  this.map_int = function (x, max) {
      return x * max / (1024);
  };

  this.offset = function (waveform, offset) {
    one = waveform.slice(0, offset);
    two = waveform.slice(offset, waveform.length);
    return two.concat(one);
  };

  this.shift = function (ctx, waveform) {
    var width = Math.floor($(window).width() / waveform.length);
    waveform.forEach(function (value, index) {
      ctx.drawImage($boilerPlate[0], index * width, 0, width, $(ctx.canvas).height(), index * width, value, width, $(window).height());
    });
  };

  this.reset();

  return {
    elements: this.elements,
    reset: this.reset,
    render: this.render,
    levelUp: this.levelUp
  }
});