let form = document.getElementById("form1");

form.onsubmit= (e) =>{
    // debugger
    e.preventDefault();
    const userlogin = [document.forms["form1"]["username"], document.forms["form1"]["password"]];
    
    const usernamevalidate =  userlogin[0].value != "";
    const passwordvalidate = CheckPassword(userlogin[1]);

    if(usernamevalidate && passwordvalidate){
        alert("Du har registrerat en användare");
    } else {
        alert("Enter stuff");
    }
}

function CheckPassword(inputtxt) 
{ 
    var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(inputtxt.value.match(paswd)) 
    { 
        alert('Correct, try another...')
        return true;
    }
    else
    { 
        alert('Wrong...!')
        return false;
    }
}  