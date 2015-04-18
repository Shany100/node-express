var http = require('http');
var strftime = require('strftime');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('system current time: ' + strftime('%F %T', new Date()));
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
