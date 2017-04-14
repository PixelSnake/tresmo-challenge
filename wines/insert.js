var db = require("../database");
var tools = require("./tools");

exports.create = function(req, res, next)
{
    var validation = tools.validate(req.params);

    if (validation)
    {
        res.status(400);
        res.send({
            error: "VALIDATION_ERROR",
            validation: validation
        });
    }
    else
    {
        req.params.year = parseInt(req.params.year);

        db.Insert(req.params, function(result) {
            if (result.error !== undefined)
                res.status(500);
            res.send(result);
        });
    }

    next();
};