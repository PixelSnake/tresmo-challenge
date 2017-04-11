var client = require("mongodb").MongoClient;
var assert = require("assert");

var url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWD}@ds157500.mlab.com:57500/${process.env.DB_NAME}`;

exports.Connect = function() {
    client.connect(url, function(err, db) {
        if (err)
        {
            console.log("Database failure.");
            return;
        }

        const wines = db.collection("wines");
        wines.find({}).toArray(function(err, result) {
            if (err)
            {
                console.log(err);
                return;
            }

            console.log("result", result);
        });
    });
};

exports.Find = function(f) {

};