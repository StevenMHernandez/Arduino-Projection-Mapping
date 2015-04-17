define(function () {
  var generate = function (obj) {
    switch (obj.waveform.type) {
      case 'random':
        return random(obj.columns.count,
          obj.waveform.amplitude);
        break;
      case 'sine':
        return sine(obj.columns.count,
          obj.waveform.amplitude,
          obj.waveform.frequency);
        break;
      case 'saw':
        return saw(obj.columns.count,
          obj.waveform.amplitude,
          obj.waveform.frequency);
        break;
      case 'triangle':
        return triangle(obj.columns.count,
          obj.waveform.amplitude,
          obj.waveform.frequency);
        break;
      default:
        return;
    }
  };

  var random = function (length, amplitude) {
    var waveform = [];
    for (var i = 0; i < length; i++) {
      waveform[i] = Math.round(Math.random() * amplitude) - (amplitude / 2);
    }
    return waveform;
  };

  var sine = function (length, amplitude, frequency) {
    var waveform = [];
    for (var i = 0; i < length; i++) {
      waveform[i] = amplitude * Math.sin(2 * Math.PI * frequency * (i / $(window).width()));
    }
    return waveform;
  };

  var saw = function (length, amplitude) {
    var waveform = [];
    for (var i = 0; i < length; i++) {
      waveform[i] = amplitude * 2 * ((i / $(window).width()) - Math.floor(.5 + (i / $(window).width())));
    }
    return waveform;
  };

  var triangle = function (length, amplitude) {
    var waveform = [];
    for (var i = 0; i < length; i++) {
      var a = $(window).width();
      waveform[i] = amplitude * ((2 / a) * (i - a * Math.floor((i / a) + .5))) * Math.pow(-1, Math.floor((i / a) + .5));
    }
    return waveform;
  };

  return {
    generate: generate
  }
});