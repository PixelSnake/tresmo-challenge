const db = require("./database");

////////////////////////////////////
//         GET REQUESTS           //
////////////////////////////////////
exports.list = function (req, res, next) {
    query = {};

    if (req.query.name)
        query.name = req.query.name;
    if (req.query.year)
        query.year = parseInt(req.query.year);
    if (req.query.type)
        query.type = req.query.type;
    if (req.query.country)
        query.country = req.query.country;

    console.log("query", query);

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
////////////////////////////////////

////////////////////////////////////
//          POST REQUESTS         //
////////////////////////////////////
exports.create = function(req, res, next)
{
    var error = false;
    var validation = {};
    var valid_types = ["red", "white", "rose"];

    console.log(req.params);

    if (!req.params.name)
    {
        validation.name = "MISSING";
        error = true;
    }

    if (!req.params.year)
    {
        validation.year = "MISSING";
        error = true;
    }
    else if (isNaN(req.params.year))
    {
        validation.year = "INVALID";
        error = true;
    }

    if (!req.params.country)
    {
        validation.country = "MISSING";
        error = true;
    }

    if (!req.params.type)
    {
        validation.type = "MISSING";
        error = true;
    }
    else if (!valid_types.includes(req.params.type))
    {
        validation.type = "INVALID";
        error = true;
    }

    if (error)
    {
        res.send({
            error: "VALIDATION_ERROR",
            validation: validation
        });
    }
    else
    {

    }

    next();
};