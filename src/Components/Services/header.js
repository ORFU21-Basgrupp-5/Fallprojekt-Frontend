import { Render as listERender } from "../Budget/listaExpenses.js";
import { Render as listIRender } from "../Budget/listaIncomes.js";
import { Render as inmatningRender } from "../Budget/AddBalanceChangeComponent.js";
import { Render as budgetRender } from "../Budget/BudgetComponent.js";
import { Render as budgetGetRender } from "../Budget/GetBudgetComponent.js";
import { Render as passwordRender } from "../User/ChangePasswordComponent.js";
import { DeleteCookie } from "./cookie.js";


const pageContent = document.getElementById("pageContent");

export class Header {
  constructor() {

    const button1 = document.getElementById("button-listexpenses");
    const button2 = document.getElementById("button-listincomes");
    const button3 = document.getElementById("button-inputs");
    const button4 = document.getElementById("button-createbudget");
    const button5 = document.getElementById("button-listbudget");
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
      DeleteCookie("token");
      window.location.href = "/";
    });
    

    

    // button4.addEventListener("click", () => {
    //   passwordRender(pageContent);
    // });

  }
}