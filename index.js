var _ = require('underscore');

var restify = require("restify");
var wines = require("./wines");

var mongodb = require("./database");
mongodb.Connect(main);

function main(db)
{
    _.db = db;

    var server = restify.createServer();
    server.use(restify.queryParser());
    server.use(restify.bodyParser());


    server.get("wines", wines.list);
    server.get("wines/:id", wines.getById);

    server.post("wines", wines.create);

    server.put("wines/:id", wines.modify);

    server.del("wines/:id", wines.delete);


    var port = process.env.PORT || 8080;
    server.listen(port);
    console.log("Listening on port " + port + "...");
}