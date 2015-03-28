requirejs.config({
  baseUrl: '/assets/js',
  paths: {
    "shapes": "shapes",
    "socketio": "/socket.io/socket.io.js"
  }
});

define(['shapes', 'socketio'],
  function (Shapes, io) {

    var setup = function () {
      $window = $(window);
      $projection = $('#projection');
      $video = $('video');
      setupCanvas();
      openSocket();
    };

    var setupCanvas = function () {
      $projection.attr('height', $window.width() * (9 / 16));
      $projection.attr('width', $window.width());
      ctx = $projection[0].getContext('2d');
    };

    var openSocket = function () {
      var socket = io('http://localhost:3006');
      socket.on('data', function (data) {
        updateSpeed(data);
      });
    };

    var render = function () {
      Shapes.paths.forEach(function (value, index) {
        ctx.save();
        ctx.beginPath();
        Shapes.paths[index].forEach(function (value, index, array) {
          if (index == 0) {
            ctx.moveTo(value[0] * $projection.attr('width'), value[1] * $projection.attr('height'));
          }
          else {
            ctx.lineTo(value[0] * $projection.attr('width'), value[1] * $projection.attr('height'));
          }
        });
        ctx.closePath();
        ctx.clip();
        ctx.drawImage($video[ index%$video.length ], 0, 0, $projection.attr('width'), $projection.attr('height'));
        ctx.restore();
      })
    };

    var updateSpeed = function (data) {
      $video[0].playbackRate = data[0];
      $video[1].playbackRate = data[1];
      $video[2].playbackRate = data[2];
    };

    var run = function () {
      setup();
      setInterval(function(){
        render();
      }, 99);
    };
    run();
  }
);