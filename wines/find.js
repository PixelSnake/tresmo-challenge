var db = require("../database");

exports.list = function (req, res, next) {
    var query = {};

    if (req.query.name)
        query.name = req.query.name;
    if (req.query.year)
        query.year = parseInt(req.query.year);
    if (req.query.type)
        query.type = req.query.type;
    if (req.query.country)
        query.country = req.query.country;

    db.Find(query, function(data) {
        data.forEach(function(x) {
            delete x._id;
        });

        res.status(200);
        res.send(data);
    });
    next();
};

exports.getById = function(req, res, next)
{
    var id = parseInt(req.params.id);
    db.FindOne({id: id}, function(data) {
        if (data)
        {
            delete data._id;
            res.send(data);
        }
        else
            res.send({
                error: "UNKNOWN_OBJECT"
            });
    });
    next();
};