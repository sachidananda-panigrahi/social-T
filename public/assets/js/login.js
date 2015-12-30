"use strict";

function login(){
    this.loginValidate();
    this.registerValidate();
    this.addEvents();
}

login.prototype.loginValidate = function(){
    $('#login-form').validate({
        errorClass: "has-error",
        validClass: "has-success",
        errorElement: "i",
        wrapper: "span",
        rules: {
            username: {
                required: true,
                email: true
            },
            password: {
                required: true
            }

        },
        messages: {
            email: {
                required: "Please enter your email.",
                email: "Your email address must be in the format of name@domain.com"
            },
            password: {
                required: "You must have to enter a password."
            }
        }
    });
};

login.prototype.addEvents = function(){
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
    });

};

login.prototype.registerValidate = function(){
    $('#register-form').validate({
        errorClass: "has-error",
        validClass: "has-success",
        errorElement: "i",
        wrapper: "span",
        rules: {
            username: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
            confirm_password: {
                required: true
            }

        },
        messages: {
            email: {
                required: "Please enter your email.",
                email: "Your email address must be in the format of name@domain.com"
            },
            password: {
                required: "You must have to enter a password."
            }
        }
    });
};

login.prototype.loginFormOnSubmit = function(){
    $('#login_form').submit(function(event){
        event.preventDefault();

    })
};

login.prototype.registerFormOnSubmit = function(){

};