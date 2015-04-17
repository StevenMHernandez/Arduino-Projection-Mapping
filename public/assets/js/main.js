requirejs.config({
  baseUrl: '/assets/js',
  paths: {
    "shapes": "shapes",
    "source": "source",
    "socketio": "/socket.io/socket.io.js"
  }
});

define(['shapes', 'socketio', 'source', 'config'],
  function (Shapes, io, Source, Config) {
    var setup = function () {
      values = [];
      $window = $(window);
      $projection = $('#projection');
      Config.animation.height = $projection.height();
      Config.animation.width = $projection.width();
      setupCanvas();
      openSocket();
    };

    var setupCanvas = function () {
      $projection.attr('height', $window.height())
        .attr('width', $window.width());
      Source.elements.each(function (index, element) {
        $(element).attr('height', $window.height())
          .attr('width', $window.width());
      });
      ctx = $projection[0].getContext('2d');
    };

    var openSocket = function () {
      var socket = io('http://localhost:3006');
      socket.on('data', function (data) {
        values = data;
      });
    };

    var render = function () {
      ctx = $projection[0].getContext('2d');
      ctx.drawImage($('#backgroundCanvas')[0], 0, 0, $projection.attr('width'), $projection.attr('height'));
      ctx.font = "900 18px Raleway";
      ctx.textAlign = "left";
      ctx.fillStyle = '#999';
      ctx.fillText(Config.level, 18, 27);
      Shapes.paths.forEach(function (value, index) {
        ctx.save();
        ctx.beginPath();
        Shapes.paths[index].forEach(function (value, index, array) {
          if (index == 0) {
            ctx.moveTo(((value[0] * $projection.attr('width') + Config.offset.x) * Config.stretch.x),
              (value[1] * ($projection.attr('width') * (9 / 16)) + Config.offset.y) * Config.stretch.y);
          }
          else {
            ctx.lineTo(((value[0] * $projection.attr('width') + Config.offset.x) * Config.stretch.x),
              (value[1] * ($projection.attr('width') * (9 / 16)) + Config.offset.y) * Config.stretch.y);
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
          switch (e.shiftKey) {
            case true:
              Config.stretch.x -= 0.005;
              break;
            default:
              Config.offset.x--;
          }
          break;
        case 38: // up
          switch (e.shiftKey) {
            case true:
              Config.stretch.y -= 0.005;
              break;
            default:
              Config.offset.y--;
          }
          break;
        case 39: // right
          switch (e.shiftKey) {
            case true:
              Config.stretch.x += 0.005;
              break;
            default:
              Config.offset.x++;
          }
          break;
        case 40: // down
          switch (e.shiftKey) {
            case true:
              Config.stretch.y += 0.005;
              break;
            default:
              Config.offset.y++;
          }
          break;
        default:
          return;
      }
    };

    var run = function () {
      setup();
      setInterval(function () {
        Source.render(this.values);
        render();
      }, 10);

      $(document).keydown(function (e) {
        shiftCanvas(e);
        switch (e.which) {
          case 13: //enter
            Source.levelUp();
            break;
          default:
            return;
        }
        e.preventDefault();
      });
    };

    run();
  }
);