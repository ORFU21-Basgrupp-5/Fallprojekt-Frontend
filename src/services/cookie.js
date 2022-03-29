export function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  // Return null if not found
  return null;
}
export function setCookie(name,value,exp_days) {
  let expires = new Date(Date.now() + 86400 * 1000).toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
export function removeCookies() {
  var res = document.cookie;
  var multiple = res.split(";");
  for(var i = 0; i < multiple.length; i++) {
     var key = multiple[i].split("=");
     document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  }
}