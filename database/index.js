var client = require("mongodb").MongoClient;

exports.Find = require("./find").Find;
exports.FindOne = require("./find").FindOne;

exports.Insert = require("./insert").Insert;

exports.Update = require("./modify").Update;

exports.Delete = require("./delete").Delete;

var url = `mongodb://${process.env.DB_USER || "dev"}:${process.env.DB_PASSWD || "B{#~L[P7bkwe"}@ds157500.mlab.com:57500/${process.env.DB_NAME || "serene-fjord-88779"}`;

exports.Connect = function(success) {
    client.connect(url, function(err, db) {
        if (err) {
            console.log("Database failure.");
            return;
        }

        success(db);
    });
};