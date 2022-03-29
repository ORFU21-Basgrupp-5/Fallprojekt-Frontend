import { render as listERender } from "../pages/listaExpenses.js";
import { render as listIRender } from "../pages/listaIncomes.js";
import { render as inmatningRender } from "../pages/inmatning.js";
import { render as budgetRender } from "../pages/budget.js";
import { render as budgetGetRender } from "../pages/getbudget.js";
import { render as passwordrender } from "../pages/changepassword.js";


const pageContent = document.getElementById("pageContent");

export class Header {
  constructor() {
    const button1 = document.getElementById("buttonELista");
    const button2 = document.getElementById("buttonILista");
    const button3 = document.getElementById("buttonInmatning");
    const button4 = document.getElementById("budgetPage");
    const button5 = document.getElementById("budgetGetPage");
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

    // button4.addEventListener("click", () => {
    //   passwordrender(pageContent);
    // });

  }
}