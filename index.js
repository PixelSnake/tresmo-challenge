var restify = require("restify");
var wines = require("./wines");

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get("wines", wines.list);
server.get("wines/:id", wines.getById);

server.post("wines", wines.create);

server.listen(process.env.PORT || 8080);