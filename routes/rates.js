var data = require("../data.json");

exports.view = function (req, res) {
  // console.log(data);

  // sort the rates in the order of pricing
  // get rates array
  var rates = data.response.rate_response.rates;
  // sort the array in the ascending order using sort comparator
  rates.sort(function (a,b) {
    return a.shipping_amount.amount - b.shipping_amount.amount;
  })
  // add the sorted array back into data.json
  data.response.rate_response.rates = rates;

  res.render('rates', data);
};

exports.data = function (req, res) {
  res.json(data);
}