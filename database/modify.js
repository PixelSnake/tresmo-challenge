var _ = require("underscore");

exports.Update = function(id, data, callback)
{
    var wines = _.db.collection("wines");

    wines.findOneAndUpdate(
        { id: id },
        { $set: data },
        { returnOriginal: false },
        function(err, result) {
            if (err)
                callback(err);
            else
                callback(undefined, result.value);
        }
    );
};