import { render as listERender } from "./listaExpenses.js";
import { render as listIRender } from "./listaIncomes.js";
import { render as inmatningRender } from "./inmatning.js";

const pageContent = document.getElementById("pageContent");

export class Header {
  constructor() {
    const button1 = document.getElementById("buttonELista");
    const button2 = document.getElementById("buttonILista");
    const button3 = document.getElementById("buttonInmatning");

    button1.addEventListener("click", () => {
      listERender(pageContent);
    });
    
    button2.addEventListener("click", () => {
      listIRender(pageContent);
    });
    button3.addEventListener("click", () => {
      inmatningRender(pageContent);
    });
  }
}
