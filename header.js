import { render as listERender } from "./listaExpenses.js";
import { render as listIRender } from "./listaIncomes.js";
import { render as inmatningRender } from "./inmatning.js";
import { render as budgetRender } from "./budget.js";
import { render as budgetGetRender } from "./getBudget.js";
import { render as passwordrender } from "./changepassword.js";
import { deleteCookie } from "./cookie.js";


const pageContent = document.getElementById("pageContent");

export class Header {
  constructor() {
    const button1 = document.getElementById("buttonELista");
    const button2 = document.getElementById("buttonILista");
    const button3 = document.getElementById("buttonInmatning");
    const button4 = document.getElementById("budgetPage");
    const button5 = document.getElementById("budgetGetPage");
    const button6 = document.getElementById("LogOut");

    //const button4 = document.getElementById("emailknapp"); 


    button1.addEventListener("click", () => {
      listERender(pageContent);
    });
    
    button2.addEventListener("click", () => {
      listIRender(pageContent);
    });
    button3.addEventListener("click", () => {
      inmatningRender(pageContent);
    });
    button4.addEventListener("click", () => {
      budgetRender(pageContent);
    });
    button5.addEventListener("click", () => {
      budgetGetRender(pageContent);
    });
    button6.addEventListener("click", () => {
      deleteCookie("token");
      window.location.href = "/";
    });
    

    

    // button4.addEventListener("click", () => {
    //   passwordrender(pageContent);
    // });

  }
}
