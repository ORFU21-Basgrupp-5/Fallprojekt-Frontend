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
            FetchReg(newUser);
            
        }
    }
    else
    {
        let errorPassContainer = document.getElementById("hidden-message");
            let newText = document.createElement("p").appendChild(document.createTextNode("Du måste fylla i alla fälten!"));
            errorPassContainer.appendChild(newText);
    }
    
}
async function FetchReg(newUser){
    let response = await fetch('https://localhost:7151/User/register', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({"userName": newUser.name, "password": newUser.password, "email": newUser.email})
})
if (response.status !== 200) {
    console.log('something went wrong');
} else{
    console.log('user registerd');
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