$('userNameValidation').hide();
$('emailValidation').hide();
$('document').ready(function(){

    let clicked = false;
    let btn = $('#show-btn');
    let box = $('#box');
    btn.on('click', function(){
        if(!clicked){
            box.addClass('show');
            clicked = true;
        }else{
            box.removeClass('show');
            clicked = false;
        }
    });

    let usernameError = true;
    let emailError = true;

    let userName = $('#username');
    userName.on('keyup', function(){
        usernameValidation();
    });

    function usernameValidation(){
        let usernameVal = $('#username').val();
        if(usernameVal.length == ""){
            $('#userNameValidation').show();
            $('#userNameValidation').html('This field cannot be empty');
            $('#userNameValidation').css('color', 'red');
            usernameError = false;
            return false;
        }else{
            $('#userNameValidation').hide();
        }

        if(usernameVal.length < 3 || usernameVal.length > 10){
            $('#userNameValidation').show();
            $('#userNameValidation').html('Invalid Username');
            $('#userNameValidation').css('color', 'red');
            usernameError = false;
            return false;
        }else{
            $('#userNameValidation').hide();
        }
    }

    let email = $('#email');
    email.on('keyup', function(){
        emailValidation();
    });

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
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal)){
            $('emailValidation').hide();
        }else{
            $('emailValidation').show();
            $('emailValidation').html('Invalid Email');
            $('emailValidation').css('color', 'red');
            emailError = false;
            return false;
        }
    }

    let closePopUpBtn = $('#close-pop-up');
    closePopUpBtn.on('click', function(){
        box.removeClass('show');
    });

    let submitBtn = $('#submit-btn');
    submitBtn.on('click', function(){
        box.removeClass('show');
    })
});