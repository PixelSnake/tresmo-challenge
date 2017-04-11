exports.list = function (req, res, next) {
    const data = {};

    res.send(data);
    next();
};

exports.getById = function(req, res, next)
{
    const data = {
        id: req.params.id
    };

    res.send(data);
    next();
};