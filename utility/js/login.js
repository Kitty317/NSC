var register_password;
var confirm_password;

$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
        register();

    });

});


function register() {
    register_password = document.getElementById("register_password");
    confirm_password = document.getElementById("confirm-password");
    register_password.onchange = function () {
        validatePassword()
    };
    confirm_password.onkeyup = function () {
        validatePassword()
    };
}

function validatePassword(){
    if(register_password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}
