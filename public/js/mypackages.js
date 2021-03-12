$(document).ready(function () {
    initializePage();
})

function initializePage() {
    var userPackages = localStorage.myPackages;
    // if user has package array
    if (userPackages != null) {
        // parse the array into JSON
        var userPackagesJSON = JSON.parse(userPackages);
    } else { // else if package array DNE
        // create a new JSON array
        var userPackagesJSON = { "packages": [] };
    }
    userPackages = JSON.stringify(userPackagesJSON);
    $.post('addPackages', { packages: userPackages }, postCallBack);

    function postCallBack(res) {
        console.log(res);
    }

    $('.package #remove').click(removePackage);
    $('.package #rates').click(getRates);
}

function removePackage(e) {
    e.preventDefault();
    // get list of packages from user's local storage
    var userPackagesJSON = JSON.parse(localStorage.myPackages);
    // get packages array
    var array = userPackagesJSON.packages;

    // get shipment ID of the element being removed
    var shipment_id = $(this).closest('.package').attr('id');
    // get new array without the element being removed
    var newArray = array.filter(function(package) {
        return package.shipment_id !== shipment_id;
    })

    // assign new array into the myPackages JSON
    userPackagesJSON.packages = newArray;
    // convert the myPackages JSON to string
    var userPackages = JSON.stringify(userPackagesJSON);
    // save to user's local storage
    localStorage.myPackages = userPackages;
    // post changes to server-side file
    $.post('addPackages', { packages: userPackages }, postCallBack);

    function postCallBack(res) {
        console.log(res);
        $('#' + shipment_id).remove();
    }
}

function getRates() {
    var shipment_id = $(this).closest('.package').attr('id');
    const id = JSON.stringify({ "shipment_id": shipment_id });

    $.post('rateById', { id: id }, postCallBack);
    function postCallBack(res) {
        var resJSON = JSON.parse(res);
        if (resJSON.rate_response) {
            window.location.href = "/rates";
        } else {
            if (resJSON.errors){
                alert(resJSON.errors[0].message);
            }
        }
    }
}
