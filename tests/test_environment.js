var _ = require("underscore");

/* emulates the "res" parameter of the restify event handler and verifies the status and send functions */

exports.setVerifyer = function(v)
{
    _.veryfier = v;
};

exports.status = function(status)
{
    if (_.veryfier)
        _.veryfier.takeNote({
            status: status
        });

    return status;
};

exports.send = function(content)
{
    if (_.veryfier)
        _.veryfier.takeNote({
            content: content
        });

    return content;
};

exports.charSet = function(c) {

};