var _ = require("underscore");

exports.Delete = function(id, callback) {
    var wines = _.db.collection("wines");

    console.log("Deleting #" + id);

    wines.removeOne({id: id}, function(err, result) {

        if (err)
            callback(err);
        else
            callback(undefined, result.deletedCount);
    });
};