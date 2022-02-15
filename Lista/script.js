let ListExp = document.getElementById("ListaUtgifter")

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }

  // Return null if not found
  return null;
}

ListExp.onclick = (e) =>
{
  let utgifter = [];
  fetch("http://localhost:7151/User/Secret", 
  {
    method: "post", 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('token')
    }})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    utgifter = data;
    upgiftsLista(utgifter)
  })
  .catch((error) => console.error("FETCH ERROR:", error));
}

function upgiftsLista(data) {
  data.forEach((item)=>{

    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      DivWithExpenses.appendChild(li);
      ListExp.remove()
    }
  })
}