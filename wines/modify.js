var db = require("../database");
var tools = require("./tools");

exports.modify = function(req, res, next)
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
        var id = parseInt(req.params.id);

        var new_wine = {
            id: id,
            name: req.params.name,
            year: parseInt(req.params.year),
            country: req.params.country,
            type: req.params.type,
            description: req.params.description === undefined ? "" : req.params.description
        };

        db.Update(id, new_wine, function(err, result) {
            if (err)
            {
                res.status(500);
                res.send({error: "INTERNAL_SERVER_ERROR"});
            }
            else
            {
                if (!result)
                {
                    res.status(400);
                    res.send({
                        error: "UNKNOWN_OBJECT"
                    });
                }
                else
                {
                    var ret = result;
                    delete ret._id;

                    res.status(200);
                    res.send(ret);
                }
            }
        });
    }

    next();
};