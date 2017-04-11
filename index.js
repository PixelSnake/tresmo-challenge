const restify = require("restify");
const wines = require("./wines");

const server = restify.createServer();

server.get("wines", wines.list);
server.get("wines/:id", wines.getById);

server.listen(8080);