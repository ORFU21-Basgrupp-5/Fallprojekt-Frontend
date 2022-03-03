export const render = (root) => {
  root.innerHTML = "";
  let formPassword = document.createElement("form")
  let breaker = document.createElement("br")
  let breaker2= document.createElement("br")

  let labelEmail= document.createElement("label")
  let emailtext=document.createTextNode("Email: ")
  let labelNew= document.createElement("label")
  let newtext=document.createTextNode("Nytt lösenord: ")
  let labelConfirm= document.createElement("label")
  let confirmtext=document.createTextNode("Bekräfta lösenord: ")

  let email = document.createElement("input")
  let newPassword = document.createElement("input")
  let confirmPassword = document.createElement("input")

  labelEmail.appendChild(emailtext)
  labelNew.appendChild(newtext)
  labelConfirm.appendChild(confirmtext)
  formPassword.appendChild(labelEmail)
  formPassword.appendChild(email)
  formPassword.appendChild(breaker2)
  formPassword.appendChild(labelNew)
  formPassword.appendChild(newPassword)
  formPassword.appendChild(breaker)
  formPassword.appendChild(labelConfirm)
  formPassword.appendChild(confirmPassword)

  // let submitbtn = document.createElement("submit")
  // formPassword.appendChild(submitbtn)

  let submitbtn = document.createElement("button")
  formPassword.appendChild(submitbtn)
  submitbtn.innerHTML = "Bekräfta";

  submitbtn.onclick = function (e) {
    e.preventDefault()
    const emailrecdto = {
      email: email.value,
      password: newPassword.value,
      confirmPassword: confirmPassword.value,
    };
    changepassword(emailrecdto)
  }
  
  root.appendChild(formPassword)

  async function changepassword() {
      
    const changepassword = await fetch(
      "http://localhost:7151/Income/AddIncome",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify(emailrecdto)
      }
    ).then((response) => {
      if (response.ok) {
        return true;
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    });
  }
  fetchInc();
};




