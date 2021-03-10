exports.view = function (req, res) {
  res.render('calculator');
};

exports.validate = function (req, res) {

  const fetch = require('node-fetch');

  const myHeaders = {
    "Host": "api.shipengine.com",
    "API-Key": "TEST_3kNoQV1BpQP/ixmlVGwHK0loRALWb3rZvatxpF2nhLI",
    "Content-Type": "application/json",
  }

  const addressJSON = req.body.addressJSON

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: addressJSON,
    redirect: 'follow',
  };

  fetch("https://api.shipengine.com/v1/addresses/validate", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.json(result);
    })
    // .then(result => res.json(result))
    .catch(error => console.log('error', error));
}