$(document).ready(function () {
    initializePage();
})

function initializePage() {
    // $('#addPackage').click(addPackage);
}

function addPackage() {
    // get API response data from server
    $.get('data', function (res) {
        // build package JSON object
        const data = res.response;
        const origin = buildOrigin(data.ship_from);
        const destination = buildDestination(data.ship_to);
        const package = buildPackage(data.packages[0]);
        const shipment_id = data.shipment_id;

        const newPackage = {
            "origin": origin,
            "destination": destination,
            "package": package,
            "shipment_id": shipment_id
        };

        // get user's myPackages from user's local storage
        var userPackages = localStorage.myPackages;
        // parse user's myPackages into JSON object array
        var userPackagesJSON = JSON.parse(userPackages);

        // check if shipment already exists in user's myPackages
        var exists = userPackagesJSON.packages.filter(x => x.shipment_id === shipment_id);

        if (exists.length !== 0) {
            console.log(exists);
            alert("Package already exists in your Package List");
        } else {
            // push the new package JSON object into array
            userPackagesJSON.packages.push(newPackage);
            // convert package array to string
            userPackages = JSON.stringify(userPackagesJSON);
            // store it back to user's local storage as 'myPackages'
            localStorage.setItem('myPackages', userPackages);
            // post the new packages array into server-side json file
            $.post('addPackages', { packages: userPackages }, postCallBack);
        }

        function postCallBack(res) {
            console.log(res);
            alert("Package added to 'My Packages'!");
        };
    })
}

function buildOrigin(data) {
    var origin = {
        "address_line1": data.address_line1,
        "address_line2": data.address_line2,
        "city_locality": data.city_locality,
        "state_province": data.state_province,
        "postal_code": data.postal_code
    }
    return origin;
}

function buildDestination(data) {
    var destination = {
        "address_line1": data.address_line1,
        "address_line2": data.address_line2,
        "city_locality": data.city_locality,
        "state_province": data.state_province,
        "postal_code": data.postal_code
    }
    return destination;
}

function buildPackage(data) {
    var package = {
        "length": data.dimensions.length,
        "width": data.dimensions.width,
        "height": data.dimensions.height,
        "weight": data.weight.value
    }
    return package;
}