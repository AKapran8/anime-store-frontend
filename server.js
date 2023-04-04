const http = require("http");
const app = require("./backend/app");

const serverPort = process.env.PORT || 3000;

app.set("port", serverPort);
const server = http.createServer(app);

server.listen(serverPort);
