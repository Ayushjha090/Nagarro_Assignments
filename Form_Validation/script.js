$('document').ready(function(){
    $('#userNameValidation').hide();
    $('#emailValidation').hide();
    $('#passwordValidation').hide();
    $('#confirmPasswordValidation').hide();

    let usernameError = true, emailError = true, pswdError = true, cnfmPswdError = true;

    // Username Validation
    $('#username').on('keyup', function(){
        usernameValidation();
    });

    // Username Validation Function
    function usernameValidation(){
        let usernameVal = $('#username').val();
        if(usernameVal.length == ""){
            $('#userNameValidation').show();
            $('#userNameValidation').html("This field cannot be empty");
            $('#userNameValidation').css('color', 'red');
            usernameError = false;
            return false;
        }else{
            $('#userNameValidation').hide();
            usernameError = true;
        }

        if(usernameVal.length < 3 || usernameVal.length > 10){
            $('#userNameValidation').show();
            $('#userNameValidation').html("Invalid Username!");
            $('#userNameValidation').css('color', 'red');
            usernameError = false;
            return false;
        }else{
            $('#userNameValidation').hide();
            usernameError = true;
        }
    }

    // Email Validation
    $('#email').on('keyup', function(){
        emailValidation();
    });

    // Email Validation Funciton
    function emailValidation(){
        let emailVal = $('#email').val();

        if(emailVal.length == ""){
            $('#emailValidation').show();
            $('#emailValidation').html('This field cannot be empty');
            $('#emailValidation').css('color', 'red');
            emailError = false;
            return false;
        }else{
            $('#emailValidation').hide();
            emailError = true;
        }

        let mailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailVal.match(mailFormat)){
            $('emailValidation').hide();
        }else{
            $('emailValidation').show();
            $('emailValidation').html('Invalid Email');
            $('emailValidation').css('color', 'red');
            emailError = false;
            return false;
        }
    }

    // Password Validation
    $('#password').on('keyup', function(){
        pswdValidation();
    });

    // Password Validation Function
    function pswdValidation(){
        let passwordVal = $('#password').val();
        if(passwordVal.length == ""){
            $('#passwordValidation').show();
            $('#passwordValidation').html('This field cannot be empty');
            $('#passwordValidation').css('color', 'red');
            pswddError = false;
            return false;
        }else{
            $('#passwordValidation').hide();
            pswdError = true;
        }

        if(passwordVal.length <= 8){
            $('#passwordValidation').show();
            $('#passwordValidation').html('The length of the password should not be less than 8!');
            $('#passwordValidation').css('color', 'red');
            pswddError = false;
            return false;
        }else{
            $('#passwordValidation').hide();
            pswdError = true;
        }
    }

    // Confirm Password Validation
    $('#confirmPassword').on('keyup', function(){
        cnfmPswdValidation();
    });

    // Confirm Password Validation Function
    function cnfmPswdValidation(){
        let confirmPasswordVal = $('#confirmPassword').val();
        let passwordVal = $('#password').val();
        if(confirmPasswordVal != passwordVal){
            $('#confirmPasswordValidation').show();
            $('#confirmPasswordValidation').html("Password doesn't match.")
            $('#confirmPasswordValidation').css('color', 'red');
            cnfmPswddError = false;
            return false;
        }else{
            $('#confirmPasswordValidation').hide();
            cnfmPswdError = true;
        }
    }

    $('#submitValidation').on('click', function(){
        emailValidation();
        if(emailError){
            return true;
        }else{
            alert("Invalid Username!");
            return false;
        }
    });

});
