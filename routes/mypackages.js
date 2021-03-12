var data = require("../mypackages.json");

exports.view = function (req, res) {
    res.render('mypackages', data);
}

exports.fill = function (req, res) {
    const packages = JSON.parse(req.body.packages);
    const array = packages.packages;
    data.packages = array;
    res.status(200).send("Successfully filled server-side file");
}