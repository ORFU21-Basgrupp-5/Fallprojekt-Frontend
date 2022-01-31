let form = document.getElementById("form1");

form.onsubmit= (e) =>{
    e.preventDefault();
    const userlogin = [document.forms["form1"]["username"], document.forms["form1"]["password"]];
    
    const upvalidate =  userlogin.every(login => login.value != "");

    if(upvalidate){
        alert("Du är inloggad");
    } else {
        alert("Enter stuff");
    }
}

