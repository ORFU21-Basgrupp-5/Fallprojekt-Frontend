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

  let submitbtn = document.createElement("submit")
  formPassword.appendChild(submitbtn)
  
  root.appendChild(formPassword)

 


}