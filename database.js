var client = require("mongodb").MongoClient;
var assert = require("assert");

var url = `mongodb://${process.env.DB_USER || "dev"}:${process.env.DB_PASSWD || "B{#~L[P7bkwe"}@ds157500.mlab.com:57500/${process.env.DB_NAME || "serene-fjord-88779"}`;

Connect = function(success) {
    client.connect(url, function(err, db) {
        if (err) {
            console.log("Database failure.");
            return;
        }

        success(db);
    });
};

exports.Find = function(query, callback) {
    Connect(function(db) {
        const wines = db.collection("wines");
        wines.find(query).toArray(function(err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    });
};

exports.FindOne = function(query, callback) {
    Connect(function(db) {
        const wines = db.collection("wines");
        wines.findOne(query, function(err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    });
};