import { getCookie } from "./cookie.js";
import { removeCookies } from "./cookie.js";

import { defaultRender } from "/services/errorHandler.js";

function headerCheck() {
    let theTooken = getCookie("token");
    let settings; 
    if(theTooken === null){
        settings = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"                
            },
            body: JSON.stringify(body),
          };
    }
    else
    {
        settings = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + theTooken
            },
            body: JSON.stringify(body),
          };
    }
    return settings;
}
const API_Service = {
    

    async GetService (endpoint) {
        let theTooken = getCookie("token");
        let settings;         
        settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getCookie("token"),
            },
          };
          if(theTooken === null){ 
            //delete settings.Authorization;
            delete settings.headers;
          }

        try{
            const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
            if (result.ok) {
                const data = await result.json();
                return data;
            } else if(result.status === 401){
                removeCookies();
                window.location.hash = "#/login";
            } else {
                const message = "Error with Status Code: " + result.status;
                throw new Error(message);
            }
        }
        catch(e){
            console.log(e);
        }
    },
    async PostService (endpoint, body) {
        let theTooken = getCookie("token");
        let settings; 
        if(theTooken === null){
            settings = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"                
                },
                body: JSON.stringify(body),
              };
        }
        else
        {
            settings = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + theTooken
                },
                body: JSON.stringify(body),
              };
        }
        
        try{
            const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
            
            if (result.ok) {
                const data = await result.json();
                console.log(data);
                return data;
            } else if(result.status === 401){
                removeCookies()
                window.location.hash = "#/login";
            } else {
                const message = "Error with Status Code: " + result.status;
                console.log(message);
                return false;
            }
        }
        catch(e){
            console.log(e);
        }
    },
    async PutService (endpoint, body) {
        let theTooken = getCookie("token");
        let settings;         
        settings = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getCookie("token"),
            },
          };
          if(theTooken === null){ 
            //delete settings.Authorization;
            delete settings.headers.Authorization;
          }
        try{
            const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
            if (result.ok) {
                return true;
            } else if(result.status === 401){
                removeCookies()
                window.location.hash = "#/login";
            } else {
                const message = "Error with Status Code: " + result.status;
                defaultRender(message);
                return false;
            }
        }
        catch(e){
            console.log(e);
        }
    },
    async DeleteService (endpoint, body) {
    
        const settings = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getCookie("token"),
            },
            body: JSON.stringify(body),
          };

        try{
            const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
            if (result.ok) {
                return true;
            } else if(result.status === 401){
                removeCookies()
                window.location.hash = "#/login";
            } else {
                const message = "Error with Status Code: " + result.status;
                defaultRender(message);
                return false;
            }
        }
        catch(e){
            console.log(e);
        }
    }
    
    
}

export default API_Service