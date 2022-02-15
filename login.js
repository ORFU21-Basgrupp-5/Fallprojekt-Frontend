let form = document.getElementById("form1");

form.onsubmit= (e) =>{
    e.preventDefault();
    const userlogin = [document.forms["form1"]["username"], document.forms["form1"]["password"]];
    
  

    const upvalidate =  userlogin.every(login => login.value != "");

    if(upvalidate){
        async function fetchLogin() {
            const response = await fetch('https://localhost:7151/User/Login?'+'userName='+ userlogin[0].value + '&passWord=' + userlogin[1].value);
            if (!response.ok) {
              alert('Fel lösenord eller användarenamn!')
            }
            else
            {
              var activeUser = userlogin[0].value;
              sessionStorage.setItem("User", activeUser);
                alert('du är inloggad');
                //window.location.assign('/welcome/');
            }

          }
          fetchLogin().catch(error => {
            error.message; // 'An error has occurred: 404'
          });
    } else {
        alert("Enter stuff");
    }
}


