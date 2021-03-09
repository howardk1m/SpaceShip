$(document).ready(function () {
    initializePage();
})

function initializePage() {
    console.log("page loaded");
    initForm();
}

function initForm() {
    $("#calcBtn").click(function () {
        console.log("calculating rates");

        var origin = getFromAddress(true);
        var destination = getToAddress(true);

        validateAddress(origin);
        validateAddress(destination);

    });

    $('#addBtn').click(function (e) {
        e.preventDefault();
        console.log("adding package");

        var origin = getFromAddress();
        var destination = getToAddress();
        var package = getPackage();

        $.post('addPackage', { origin: origin, destination: destination, package: package }, postCallBack);
    });

    function postCallBack(res) {
        alert("Package successfully added");
    }
}

function getFromAddress(bool) {
    var fromLine1 = $("#fromaddress1").val();
    var fromLine2 = $("#fromaddress2").val();
    var fromCity = $("#fromCity").val();
    var fromState = $("#fromState").val();
    var fromZip = $("#fromZip").val();

    if (bool) {
        var from = JSON.stringify([{
            "address_line1": fromLine1,
            "address_line2": fromLine2,
            "city_locality": fromCity,
            "state_province": fromState,
            "postal_code": fromZip,
            "country_code": "US"
        }]);
    } else {
        var from = JSON.stringify({
            "address_line1": fromLine1,
            "address_line2": fromLine2,
            "city_locality": fromCity,
            "state_province": fromState,
            "postal_code": fromZip,
            "country_code": "US"
        });
    }

    return from;
}

function getToAddress(bool) {
    var toLine1 = $("#toaddress1").val();
    var toLine2 = $("#toaddress2").val();
    var toCity = $("#toCity").val();
    var toState = $("#toState").val();
    var toZip = $("#toZip").val();

    if (bool) {
        var to = JSON.stringify([{
            "address_line1": toLine1,
            "address_line2": toLine2,
            "city_locality": toCity,
            "state_province": toState,
            "postal_code": toZip,
            "country_code": "US"
        }]);
    } else {
        var to = JSON.stringify({
            "address_line1": toLine1,
            "address_line2": toLine2,
            "city_locality": toCity,
            "state_province": toState,
            "postal_code": toZip,
            "country_code": "US"
        });
    }

    return to;
}

function getPackage() {
    var length = $("#length").val();
    var lengthD = $("#lengthD option:selected").val();
    var width = $("#width").val();
    var widthD = $("#widthD option:selected").val();
    var height = $("#height").val();
    var heightD = $("#heightD option:selected").val();
    var weight = $("#weight").val();
    var weightD = $("#weightD option:selected").val();


    var dimension = JSON.stringify({
        "length": length + " " + lengthD,
        "width": width + " " + widthD,
        "height": height + " " + heightD,
        "weight": weight + " " + weightD,
    });

    return dimension;
}

function validateAddress(addressJSON) {

    var myHeaders = new Headers();
    myHeaders.append("Host", "api.shipengine.com");
    myHeaders.append("API-Key", "TEST_3kNoQV1BpQP/ixmlVGwHK0loRALWb3rZvatxpF2nhLI");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: addressJSON,
        redirect: 'follow'
    };

    fetch("https://api.shipengine.com/v1/addresses/validate", requestOptions)
        .then(response => console.log(response.text()))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
