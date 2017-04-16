var _ = require("underscore");

var Connect = require("./index").Connect;

exports.Find = function(query, callback)
{
    var wines = _.db.collection("wines");
    wines.find(query).toArray(function(err, result) {
        callback(result);
    });
};

exports.FindOne = function(query, callback)
{
    var wines = _.db.collection("wines");
    wines.findOne(query, function(err, result) {
        callback(result);
    });
};