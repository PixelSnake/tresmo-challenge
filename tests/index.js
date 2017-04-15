//////////////////////////////////////////////
// Unit testing for the wines api           //
// To start the tests, execute "node tests" //
// Please note that this will affect all    //
// documents in the database. Any stored    //
// wines will get lost during testing       //
//////////////////////////////////////////////

var _ = require("underscore");

var Veryfier = require("./veryfier").Veryfier;
var env = require("./test_environment");
var wines = require("../wines");

var mongodb = require("../database");
mongodb.Connect(main);



/* set verbose to true if you want detailed output */
_.verbose = false;

var num_test = 0;
var num_failed_tests = 0;
var tests = [
    function() {
        test_list(200, []);
    },
    function() {
        test_get_by_id(1, 400, {
            error: "UNKNOWN_OBJECT"
        });
    },
    function() {
        test_insert_wine_1(200, {
            id: 1,
            name: "Cabernet sauvignon",
            year: 2013,
            country: "France",
            type: "red",
            description: "The Sean Connery of red wines"
        });
    },
    function() {
        test_insert_wine_2(200, {
            id: 2,
            name: "Zinfandel",
            year: 1990,
            country: "Croatia",
            type: "red",
            description: "Thick and jammy"
        });
    },
    function() {
        test_insert_wine_3(400, {
            error: "VALIDATION_ERROR",
            validation: {
                name: "MISSING",
                year: "INVALID",
                type: "INVALID"
            }
        });
    },
    function() {
        test_list(200, [
            {
                "id": 1,
                "name": "Cabernet sauvignon",
                "year": 2013,
                "country": "France",
                "type": "red",
                "description": "The Sean Connery of red wines"
            },
            {
                "id": 2,
                "name": "Zinfandel",
                "year": 1990,
                "country": "Croatia",
                "type": "red",
                "description": "Thick and jammy"
            }
        ]);
    },
    function() {
        test_get_by_id(2, 200, {
            "id": 2,
            "name": "Zinfandel",
            "year": 1990,
            "country": "Croatia",
            "type": "red",
            "description": "Thick and jammy"
        });
    },
    function() {
        test_modify_wine_1(200, {
            "id": 2,
            "name": "Zinfandel vom Aldi",
            "year": 2016,
            "country": "Germany",
            "type": "red",
            "description": "Thick, jammy and cheap"
        });
    },
    function() {
        test_modify_wine_2(400, {
            error: "VALIDATION_ERROR",
            validation: {
                type: "INVALID",
                year: "INVALID",
                country: "MISSING"
            }
        });
    },
    function() {
        test_modify_wine_3(400, {
            error: "UNKNOWN_OBJECT"
        });
    },
    function() {
        test_delete_wine(200, {
            success: true
        });
    },
    function() {
        test_delete_wine(400, {
            error: "UNKNOWN_OBJECT"
        });
    }
];

var noop = function() {};


function main(db) {
    _.db = db;

    clear_db();
    next_test();
}

function next_test(result) {
    if (num_test > 0)
    {
        console.log("Test " + num_test + ": ", result);
        if (!result)
            num_failed_tests++;
    }

    if (tests.length > num_test) {
        if (_.verbose)
            console.log("Starting test " + (num_test + 1));
        tests[num_test++]();
    }
    else {
        console.log(`Testing finished: ${num_failed_tests} of ${num_test} failed.`);
        process.exit(num_failed_tests === 0);
    }
}

function clear_db() {
    var wines = _.db.collection("wines");
    wines.removeMany();

    var counters = _.db.collection("counters");
    counters.findAndModify(
        { _id: "wine_id" },
        [],
        { seq: 0 },
        {new: true},
        noop
    );
}

function test_list(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {}
    };

    env.setVerifyer(veryfier);

    wines.list(req, env, noop);
}

function test_get_by_id(id, status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            id: id
        }
    };

    env.setVerifyer(veryfier);

    wines.getById(req, env, noop);
}

function test_insert_wine_1(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            name: "Cabernet sauvignon",
            year: 2013,
            country: "France",
            type: "red",
            description: "The Sean Connery of red wines"
        }
    };

    env.setVerifyer(veryfier);

    wines.create(req, env, noop);
}

function test_insert_wine_2(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            name: "Zinfandel",
            year: 1990,
            country: "Croatia",
            type: "red",
            description: "Thick and jammy"
        }
    };

    env.setVerifyer(veryfier);

    wines.create(req, env, noop);
}

function test_insert_wine_3(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            year: "hallo",
            country: "Croatia",
            type: "blue",
            description: "Thick and jammy"
        }
    };

    env.setVerifyer(veryfier);

    wines.create(req, env, noop);
}

function test_modify_wine_1(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            "id": 2,
            "name": "Zinfandel vom Aldi",
            "year": 2016,
            "country": "Germany",
            "type": "red",
            "description": "Thick, jammy and cheap"
        }
    };

    env.setVerifyer(veryfier);

    wines.modify(req, env, noop);
}

function test_modify_wine_2(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            "id": 2,
            "name": "Zinfandel vom Aldi",
            "year": "zweitausendundsechzehn",
            "type": "blue",
            "description": "Thick, jammy and cheap"
        }
    };

    env.setVerifyer(veryfier);

    wines.modify(req, env, noop);
}

function test_modify_wine_3(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            "id": 5,
            "name": "Zinfandel vom Aldi",
            "year": 2016,
            "country": "Germany",
            "type": "red",
            "description": "Thick, jammy and cheap"
        }
    };

    env.setVerifyer(veryfier);

    wines.modify(req, env, noop);
}

function test_delete_wine(status, content) {
    var veryfier = new Veryfier(status, content, function(v) {
        next_test(v);
    });
    var req = {
        query: {},
        params: {
            "id": 2
        }
    };

    env.setVerifyer(veryfier);

    wines.delete(req, env, noop);
}