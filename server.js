var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;
var sp = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 14400,
  parser: serialport.parsers.readline("\n")
});

sp.on("open", function () {
  console.log('connected');
  sp.on('data', function(data) {
    data = data.split(',');
    data = data.map(function(num) {
      return num / 100;
    });
    console.log(data);
    io.emit('data', data);
  });
});

server.listen(3006);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});