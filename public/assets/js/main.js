requirejs.config({
  baseUrl: '/assets/js',
  paths: {
    "shapes": "shapes",
    "source": "source",
    "socketio": "/socket.io/socket.io.js"
  }
});

define(['shapes', 'socketio', 'source'],
  function (Shapes, io, Source) {
    var setup = function () {
      config = {
        offset: {
          x: 0, //4,
          y: 0 //39
        },
        stretch: {
          x: 1, //0.995,
          y: 1 //1.18
        }
      };
      values = [];
      $window = $(window);
      $projection = $('#projection');
      console.log('this setup');
      setupCanvas();
      openSocket();
    };

    var setupCanvas = function () {
      $projection.attr('height', $window.height())
        .attr('width', $window.width());
      Source.elements.each(function(index, element) {
        $(element).attr('height', $window.height())
          .attr('width', $window.width());
      });
      ctx = $projection[0].getContext('2d');
    };

    var openSocket = function () {
      var socket = io('http://localhost:3006');
      socket.on('data', function (data) {
        //Source.render(data);
        values = data;
      });
    };

    var render = function () {
      ctx = $projection[0].getContext('2d');
      ctx.drawImage($('#backgroundCanvas')[0], 0, 0, $projection.attr('width'), $projection.attr('height'));
      Shapes.paths.forEach(function (value, index) {
        ctx.save();
        ctx.beginPath();
        Shapes.paths[index].forEach(function (value, index, array) {
          if (index == 0) {
            ctx.moveTo(((value[0] * $projection.attr('width') + config.offset.x) * config.stretch.x),
              (value[1] * ($projection.attr('width') * (9 / 16)) + config.offset.y) * config.stretch.y);
          }
          else {
            ctx.lineTo(((value[0] * $projection.attr('width') + config.offset.x) * config.stretch.x),
              (value[1] * ($projection.attr('width') * (9 / 16)) + config.offset.y) * config.stretch.y);
          }
        });
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(Source.elements[index % Source.elements.length], 0, 0, $projection.attr('width'), $projection.attr('height'));
        ctx.restore();
      })
    };

    var shiftCanvas = function (e) {
      switch (e.which) {
        case 37: // left
          switch(e.shiftKey) {
            case true:
              config.stretch.x += 0.005;
              break;
            default:
              config.offset.x--;
          }
          break;
        case 38: // up
          switch(e.shiftKey) {
            case true:
              config.stretch.y += 0.005;
              break;
            default:
              config.offset.y--;
          }
          break;
        case 39: // right
          switch(e.shiftKey) {
            case true:
              config.stretch.x -= 0.005;
              break;
            default:
              config.offset.x++;
          }
          break;
        case 40: // down
          switch(e.shiftKey) {
            case true:
              config.stretch.y -= 0.005;
              break;
            default:
              config.offset.y++;
          }
          break;
        default:
          return;
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    };

    var run = function () {
      setup();

      setInterval(function () {
        Source.render(this.values);
        render();
      }, 99);

      $(document).keydown(function (e) {
        shiftCanvas(e)
      });
    };

    run();
  }
);