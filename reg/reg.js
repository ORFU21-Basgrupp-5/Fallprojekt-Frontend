let form = document.getElementById("reg_form");



form.onsubmit= (e) =>{

    e.preventDefault();
    const userRegister = 
        [
        document.forms["reg_form"]["username"].value, 
        document.forms["reg_form"]["email"].value,
        document.forms["reg_form"]["password"].value,
        document.forms["reg_form"]["password2"].value
        ];
    
        
    
    const usernamevalidate =  userRegister.every(x => x.value != "");
    if(usernamevalidate)
    {
        if(userRegister[2].value != userRegister[3].value)
        {
            let errorPassContainer = document.getElementById("hidden-message");
            let newText = document.createElement("p").appendChild(document.createTextNode("Lösenorden matchar inte!"));
            errorPassContainer.appendChild(newText);
        }
        else if(CheckPassword(userRegister[2]) === false)
        {
            let errorPassContainer = document.getElementById("hidden-message");
            let newText = document.createElement("p").appendChild(document.createTextNode("Ditt lösenord måste ha minst 12 tecken,en gemen, en storbokstav, en siffra och ett special tecken"));
            errorPassContainer.appendChild(newText);
        }
        else
        {
            debugger
            const name = userRegister[0];
            const email = userRegister[1];
            const password = userRegister[2];
            const newUser = new userDTO(name,password,email);

       

                // todo Fixa API connection
            // let response = await fetch('https://localhost:7151/User/Login?userName=TestKonto1&passWord=admin',opts);
            // fetch('https://localhost:7151/User/Login', {
            //     method: 'post',
            //     body: JSON.stringify({ name: namevalue, address: addressvalue })
            // })
            //     .then(function (response) {
            //         if (response.status !== 200) {
            //             console.log('fetch returned not ok' + response.status);
            //         }
        
            //         response.json().then(function (data) {
            //             console.log('fetch returned ok');
            //             console.log(data);
            //         });
            //     })
            //     .catch(function (err) {
            //         console.log(`error: ${err}`);
            //     });
            // }, false);
            
        }
        
     

        
        
    }
    else
    {
        let errorPassContainer = document.getElementById("hidden-message");
            let newText = document.createElement("p").appendChild(document.createTextNode("Du måste fylla i alla fälten!"));
            errorPassContainer.appendChild(newText);
    }
    
}
 class userDTO {
    constructor(userName,password,email) {
        this.userName = userName;
        this.password = password;
        this.email = email;
     }
 }


function CheckPassword(password) 
{ 
  
    var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,50}$/;
    if(password.match(paswd)) 
    { 
        
        return true;
    }
    else
    { 
     
        return false;
    }
}  