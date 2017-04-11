const db = require("./database");

exports.list = function (req, res, next) {
    db.Find({}, function(data) {
        data.forEach(function(x) {
            delete x._id;
        });

        res.send(data);
    });
    next();
};

exports.getById = function(req, res, next)
{
    const id = parseInt(req.params.id);
    console.log("Getting wine #" + id);

    db.FindOne({id: id}, function(data) {
        if (data)
        {
            delete data._id;
            res.send(data);
        }
        else
            res.send({
                error: 'UNKNOWN_OBJECT'
            });
    });
    next();
};