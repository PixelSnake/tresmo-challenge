var _ = require("underscore");

exports.getNextSequence = function(name, callback) {
    var counters = _.db.collection("counters");
    counters.findAndModify(
            { _id: name },
            [],
            { $inc: { seq: 1 } },
            {new: true},
        function(err, result) {
            if (!err)
                callback(result.value.seq);
            else
                callback(-1);
        }
    );
};