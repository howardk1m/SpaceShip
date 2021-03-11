$(document).ready(function () {
    initializePage();
})

function initializePage() {
    console.log("Page loaded");
    initForm();
}

function initForm() {
    $("#packageForm").submit(function (e) {
        e.preventDefault();
        console.log("calculating rates");

        var ship_from = getFromAddress;
        var ship_to = getToAddress;
        var package = getPackage;

        getRates(ship_from, ship_to, package);
    });
}

function getRates(from, to, package) {

    // function postCallBack(res) {
    //     console.log(JSON.parse(res));
    // }
    $.post('calculate', { ship_from: from, ship_to: to, package: package });
}


function getFromAddress() {
    var fromLine1 = $("#fromaddress1").val();
    var fromLine2 = $("#fromaddress2").val();
    var fromCity = $("#fromCity").val();
    var fromState = $("#fromState").val();
    var fromZip = $("#fromZip").val();

    var from = JSON.stringify({
        "name": "Howard Kim",
        "phone": "408-654-0987",
        "address_line1": fromLine1,
        "address_line2": fromLine2,
        "city_locality": fromCity,
        "state_province": fromState,
        "postal_code": fromZip,
        "country_code": "US"
    });

    return from;
}


function getToAddress() {
    var toLine1 = $("#toaddress1").val();
    var toLine2 = $("#toaddress2").val();
    var toCity = $("#toCity").val();
    var toState = $("#toState").val();
    var toZip = $("#toZip").val();

    var to = JSON.stringify({
        "name": "Scott Klemmer",
        "phone": "415-920-1749",
        "address_line1": toLine1,
        "address_line2": toLine2,
        "city_locality": toCity,
        "state_province": toState,
        "postal_code": toZip,
        "country_code": "US"
    });

    return to;
}


function getPackage() {
    var length = $("#length").val();
    // var lengthD = $("#lengthD option:selected").val();
    var width = $("#width").val();
    // var widthD = $("#widthD option:selected").val();
    var height = $("#height").val();
    // var heightD = $("#heightD option:selected").val();
    var weight = $("#weight").val();
    // var weightD = $("#weightD option:selected").val();
    if ($(".insCheck").is(":checked")) {
        var value = $("#value").val();
    } else {
        var value = 0;
    }

    var dimension = JSON.stringify({
        "length": length,
        "width": width,
        "height": height,
        "weight": weight,
        "value": value
    });

    return dimension;
}