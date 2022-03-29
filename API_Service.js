import { getCookie } from "./cookie.js";
import { defaultRender } from "./errorHandler.js";

const API_Service = {
    async GetService (endpoint) {
    
        const settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getCookie("token"),
            },
          };

        try{
            const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
            if (result.ok) {
                const data = await result.json();
                return data;
            } else if(result.status === 401){
                window.location.reload();
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
    
        const settings = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getCookie("token"),
            },
            body: JSON.stringify(body),
          };

        try{
            const result = await fetch(`http://localhost:7151/api/${endpoint}`, settings);
            const data = await result.json();
            if (result.ok) {
                console.log(data);
                return data;
            } else if(result.status === 401){
                window.location.reload();
            } else {
                const message = "Error with Status Code: " + result.status;
                defaultRender(message);
                return "";
            }
        }
        catch(e){
            console.log(e);
        }
    },
    async PutService (endpoint, body) {
    
        const settings = {
            method: "PUT",
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
                window.location.reload();
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
                window.location.reload();
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