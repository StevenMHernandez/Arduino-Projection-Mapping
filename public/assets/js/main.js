requirejs.config({
  baseUrl: '/assets/js',
  shim: {
    'socketio': {
      exports: '../../socket.io/socket.io'
    }
  },
  paths: {
    "shapes": "shapes",
    "socketio": "/socket.io/socket.io.js"
  }
});

define(['shapes', 'socketio'],
  function (Shapes, io) {
    var socket = io('http://localhost:3006');
    socket.on('data', function (data) {
      updateSpeed(data);
    });
  }
);

var updateSpeed = function (data) {
  $('video')[0].playbackRate = data[0];
  $('video')[1].playbackRate = data[1];
  $('video')[2].playbackRate = data[2];
};
