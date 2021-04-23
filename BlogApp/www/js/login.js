
function check(form) {

    if (form.userid.value == "toto" && form.pswrd.value == "1234") {
        window.location.replace('home.html')
    }

    else {
        alert("Incorrect Username or Password")
    }
}


