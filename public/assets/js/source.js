define(function () {

  this.config = {
    words: [
      'Mirino',
      'fashionable',
      'leaseholder'
    ],
    waveforms: []
  };

  this.elements = [];
  var $boilerPlate = {};


  this.reset = function () {
    this.elements = $('.source');
    var waveform = [];
    for (var i = 0; i < 33; i++) {
      waveform[i] = Math.round(Math.random() * 200) - 100;
    }

    $('.ie').append('<canvas id="boilerPlate"></canvas>');
    $boilerPlate = $('#boilerPlate');
    $boilerPlate.attr('height', $(window).height())
      .attr('width', $(window).width());
    $boilerPlateCtx = $boilerPlate[0].getContext('2d');

    this.renderText($boilerPlateCtx);

    this.shift($boilerPlateCtx, waveform);
    waveform = waveform.map(function (value) {
      return value * -1;
    });

    var parent = this;
    this.elements.each(function (index) {
      random = Math.floor(Math.random() * waveform.length);

      parent.config.waveforms[index] = offset(waveform, random);
      //parent.config.waveforms[index] = $.merge(waveform.slice(0, random),
      //  waveform.slice(random, waveform.length));
    });
  };

  this.renderText = function (ctx) {
    var $backgroundCanvas = $('#backgroundCanvas');
    var $window = $(window);
    $backgroundCanvas.attr('height', $window.height())
      .attr('width', $window.width());
    var backgroundCtx = $backgroundCanvas[0].getContext('2d');
    backgroundCtx.rect(0, 0, $boilerPlate.attr('width'), $boilerPlate.attr('height'));
    backgroundCtx.fillStyle = 'black';
    backgroundCtx.fill();
    backgroundCtx.font = "200px Georgia";
    backgroundCtx.textAlign = "center";
    backgroundCtx.fillStyle = 'white';
    backgroundCtx.fillText(this.config.words[Math.floor(Math.random() * this.config.words.length)], ($window.width() / 2), ($window.height() / 2));
    ctx.drawImage($backgroundCanvas[0], 0, 0, $window.width(), $window.height());
  };

  this.render = function (data) {
    parent = this;
    this.elements.each(function (index, element) {
      //place boilerplate image
      $(parent.elements[index])[0].getContext('2d').drawImage($boilerPlate[0], 0, 0);
      // offset waveform
      waveform = offset(parent.config.waveforms[index], data[index]);
      // shift
      shift($(parent.elements[index])[0].getContext('2d'), waveform);
    });
  };

  this.offset = function (waveform, offset) {
    one = waveform.slice(0, offset);
    two = waveform.slice(offset, waveform.length);
    return two.concat(one);
  };

  this.shift = function (ctx, waveform) {
    var width = Math.floor($(window).width() / waveform.length);
    waveform.forEach(function (value, index) {
      ctx.drawImage($boilerPlate[0], index * width, 0, width, $(window).height(), index * width, value, width, $(window).height());
    });
  };

  this.reset();

  return {
    config: this.config,
    elements: this.elements,
    reset: this.reset,
    render: this.render
  }
});