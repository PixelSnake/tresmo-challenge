var _ = require("underscore");

var tools = require("./tools");

exports.Insert = function(query, callback)
{
    var wines = _.db.collection("wines");

    tools.getNextSequence("wine_id", function(seq) {
        if (seq < 0)
            callback({ error: "INTERNAL_SERVER_ERROR" });

        var new_wine = {
            id: seq,
            name: query.name,
            year: query.year,
            country: query.country,
            type: query.type,
            description: query.description === undefined ? "" : query.description
        };

        wines.insertOne(new_wine)
            .then(function(result) {
                var ret = result.ops[0];
                delete ret._id;

                callback(ret);
            });
    });
};