const http = require('http');

const serverPort = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end('This page must be work');
});

server.listen(serverPort);
