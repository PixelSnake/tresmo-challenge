const restify = require("restify");
const wines = require("./wines");

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

const server = restify.createServer();

server.get("wines", wines.list);
server.get("wines/:id", wines.getById);

server.listen(process.env.PORT || 8080);