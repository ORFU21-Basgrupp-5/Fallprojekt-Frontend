import { render as listERender } from "./listaExpenses.js";
import { render as listIRender } from "./listaIncomes.js";
import { render as inmatningRender } from "./inmatning.js";
import { render as passwordrender } from "./changepassword.js";

const pageContent = document.getElementById("pageContent");

export class Header {
  constructor() {
    const button1 = document.getElementById("buttonELista");
    const button2 = document.getElementById("buttonILista");
    const button3 = document.getElementById("buttonInmatning");
    //const button4 = document.getElementById("emailknapp"); Knapp för att komma till lösenordsåterställning

    button1.addEventListener("click", () => {
      listERender(pageContent);
    });
    
    button2.addEventListener("click", () => {
      listIRender(pageContent);
    });
    button3.addEventListener("click", () => {
      inmatningRender(pageContent);
    });
    // button4.addEventListener("click", () => {
    //   passwordrender(pageContent);
    // });
  }
}
