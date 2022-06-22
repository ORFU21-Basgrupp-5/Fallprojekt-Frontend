import { GetCookie } from "../Components/Services/cookie.js";
import { DefaultRender } from "../Components/Services/messageHandler.js";


const API_Service = {
  async GetService(endpoint) {

    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie("token"),
      },
    };

    try {
      const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
      if (result.ok) {
        const data = await result.json();
        return data;
      } else if (result.status === 401) {
        window.location.reload();
      } else {
        const message = "Error with Status Code: " + result.status;
        return false;
      }
    }
    catch (e) {
      console.log(e);
    }
  },
  async GetQuotesService() {

    const settings = {
      method: "GET",
      headers: {
        "X-Api-Key":"oiXOgKnlrDSJELimF2oB1w==liinfuhNTlLE4U5o"
      },
    };

    try {
      const result = await fetch(`https://api.api-ninjas.com/v1/quotes?category=happiness`, settings);
      if (result.ok) {
        const data = await result.json();
        return data;
      }       
    }
    catch (e) {
      console.log(e);
    }
  },
  async PostService(endpoint, body) {
    let theTooken = GetCookie("token");
    let settings;
    if (theTooken === null) {
      settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      };
    }
    else {
      settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + theTooken
        },
        body: JSON.stringify(body),
      };
    }

    try {
      const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);

      if (result.status === 200) {
        const data = await result.json()
        if(data != null){
          return data;
        }
        return true;
      } else if (result.status === 401) {
        window.location.reload();
      } else if (result.status === 400){
        return false;
      }
    }
    catch (e) {
      console.log('e');
      return false;
      
    }
  },
  async PutService(endpoint, body) {

    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie("token"),
      },
      body: JSON.stringify(body),
    };

    try {
      const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
      if (result.ok) {
        return true;
      } else if (result.status === 401) {
        window.location.reload();
      } else {
        const message = "Error with Status Code: " + result.status;
        DefaultRender(message);
        return false;
      }
    }
    catch (e) {
      console.log(e);
    }
  },
  async DeleteService(endpoint, body) {

    const settings = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie("token"),
      },
      body: JSON.stringify(body),
    };

    try {
      const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
      if (result.ok) {
        return true;
      } else if (result.status === 401) {
        window.location.reload();
      } else {
        const message = "Error with Status Code: " + result.status;
        DefaultRender(message);
        return false;
      }
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default API_Service