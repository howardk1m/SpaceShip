var data = require("../mypackages.json");

exports.view = function (req, res) {
    res.render('mypackages', data);
}

exports.add = function (req, res) {
    var origin = req.body.origin;
    var destination = req.body.destination;
    var package = req.body.package;

    var final = {
        "origin": JSON.parse(origin),
        "destination": JSON.parse(destination),
        "package": JSON.parse(package),
    };


    data.packages.push(final);
    console.log(data.packages);
    res.send(final);
}