exports.validate = function(params)
{
    var error = false;
    var validation = {};
    var valid_types = ["red", "white", "rose"];

    if (!params.name)
    {
        validation.name = "MISSING";
        error = true;
    }

    if (!params.year)
    {
        validation.year = "MISSING";
        error = true;
    }
    else if (isNaN(params.year))
    {
        validation.year = "INVALID";
        error = true;
    }

    if (!params.country)
    {
        validation.country = "MISSING";
        error = true;
    }

    if (!params.type)
    {
        validation.type = "MISSING";
        error = true;
    }
    else if (!valid_types.includes(params.type))
    {
        validation.type = "INVALID";
        error = true;
    }

    if (error)
        return validation;
};