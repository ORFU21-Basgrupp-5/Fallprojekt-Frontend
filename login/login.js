


let form = document.getElementById("form1");

form.onsubmit= (e) =>{
    e.preventDefault();
    const userlogin = [document.forms["form1"]["username"], document.forms["form1"]["password"]];
    
    debugger

    //   fetch('https://localhost:7151/User/', {
    //     method: "POST",
    //     body: JSON.stringify(_data),
    //     headers: {"Content-type": "application/json; charset=UTF-8"}
    //   })
    //   .then(response => response.json()) 
    //   .then(json => console.log(json));
    //   .catch(err => console.log(err));

   




 
//Login?userName=test&passWord=baba'

  // Do something with response

    const upvalidate =  userlogin.every(login => login.value != "");

    if(upvalidate){
        async function fetchLogin() {
            const response = await fetch('https://localhost:7151/User/Login?'+'userName='+ userlogin[0].value + '&passWord=' + userlogin[1].value);
            if (!response.ok) {
              alert('Fel lösenord eller användarenamn!')
            }
            else
            {
                alert('du är inloggad');
            }
            // const result = await response.json();
            // alert('du är inloggad');
            // console.log(result);
            // return result;
          }
          fetchLogin().catch(error => {
            error.message; // 'An error has occurred: 404'
          });
    } else {
        alert("Enter stuff");
    }
}


