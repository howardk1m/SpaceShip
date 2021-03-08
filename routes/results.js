var data = require("../data.json");

exports.rates = function (req, res) {
  var fromCity = req.query.fromCity;
  var fromState = req.query.fromState
  var fromZip = req.query.fromZip
  var toCity = req.query.toCity
  var toState = req.query.toState
  var toZip = req.query.toZip;

  var details = {
    "fromCity": fromCity,
    "fromState": fromState,
    "fromZip": fromZip,
    "toCity": toCity,
    "toState": toState,
    "toZip": toZip,
  }

  data.details = details;
  res.render('results', data);
};