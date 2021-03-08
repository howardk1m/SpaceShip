function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('Facebook login status changed.');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log('Successfully logged in with Facebook');
        FB.api('/me?fields=name,first_name,picture.width(480)', changeUser);
    }
}

function changeUser(response) {
    //Add code to change name and image 
    $(".Login").hide();
    $("hr").show();
    getNav();
    $("nav").show();
    $("#profile-img").attr("src", response.picture.data.url)
    $("#profile-name").text(response.name);
}

function logout() {
    FB.logout(function (response) {
        console.log('Facebook login status changed.');
    });
    $(".Login").show();
    $("hr").hide();
    $("nav").hide();
    $("#profile-img").attr("src", "//ssl.gstatic.com/accounts/ui/avatar_2x.png")
    $("#profile-name").text("");
}

function getNav() {

    var navHTML = '<a href="/calculator">Shipping Calculator</a>' + 
    '<a href="/mypackages">My Packages</a>' +
    '<a onclick="logout();">Logout</a>';

    $(".navCol").html(navHTML);
}