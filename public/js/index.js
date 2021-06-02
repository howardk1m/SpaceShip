$(document).ready(function () {
    initializePage();
})

function initializePage() {
    console.log("Page Loaded");

    if (localStorage.loginState != null) {
        changeUser();
    } 
    // else {
    //     $("hr").hide();
    //     $("nav").hide();
    // }
}

// function saveUser(response) {
//     // $("#profile-img").attr("src", response.picture.data.url)
//     $("#greeting").text("Hello " + response.first_name + "!");
//     localStorage.setItem("loginState", true);
//     // localStorage.setItem("userPic", response.picture.data.url);
//     localStorage.setItem("userName", response.first_name);
// }

// function authUser() {
//     FB.login(checkLoginStatus);
// }

// function checkLoginStatus(response) {
//     // log fb login change
//     console.log('Checking Facebook Login Status');
//     console.log(response);

//     if (response && response.status == 'connected') {
//         // Logged into your app and Facebook.
//         console.log('Successfully logged in with Facebook');
//         FB.api('/me?fields=name,first_name,picture.width(480)', saveUser);
//         changeUser();
//     }
// }

function changeUser() {
    // get user packages from user's local storage
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

    // $(".Login").hide();
    $("hr").show();
    getNav();
    $("nav").show();
    // $("#profile-img").attr("src", localStorage.userPic)
    // $("#greeting").text("Hello " + localStorage.userName + "!");
}

// function logout() {
//     localStorage.removeItem("loginState");
//     // localStorage.removeItem("userPic");
//     localStorage.removeItem("userName");
//     FB.logout(function (response) {
//         console.log('Facebook login status changed.');
//     });
//     $(".Login").show();
//     $("hr").hide();
//     $("nav").hide();
//     // $("#profile-img").attr("src", "//ssl.gstatic.com/accounts/ui/avatar_2x.png")
//     $("#greeting").text("");
// }

function getNav() {

    var navHTML = '<a href="/calculator">Shipping Calculator</a>' +
        '<a href="/mypackages">My Packages</a>' ;
        // + '<a onclick="logout();">Logout</a>';

    $(".navCol").html(navHTML);
}