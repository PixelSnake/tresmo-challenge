var db = require("../database");

exports.delete = function(req, res, next)
{
    res.charSet("utf-8");

    var id = parseInt(req.params.id);

    db.Delete(id, function(err, result) {
        if (err)
        {
            res.status(500);
            res.send({
                error: "INTERNAL_SERVER_ERROR"
            });
        }
        else
        {
            if (result === 1) {
                res.status(200);
                res.send({success: true});
            }
            else {
                res.status(400);
                res.send({error: "UNKNOWN_OBJECT"});
            }
        }
    });

    next();
};