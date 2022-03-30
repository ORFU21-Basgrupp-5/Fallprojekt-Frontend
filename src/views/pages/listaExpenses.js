import API_Service from '/services/API_Service.js';
import { defaultRender } from "/services/errorHandler.js";

let ListaExpenses = {
    render: async () => {
        let view = `
        <div class="container">
          <h1>Lista Utgifter</h1>
            <div id="DivWithExpenses" class="budget_list">
              <div id="errorDiv" class="errorMessage"></div>
            </div>
          </div>`;

        return view;
    },
    after_render: async () => {
      fetchresult();
      async function fetchresult() {
        const data = await API_Service.GetService("Expense");
        if(data != null){
          upgiftsLista(data);
        }
      }
      function upgiftsLista(data) {
        data.forEach((item) => {
          let diven = document.getElementById("DivWithExpenses");
          let listContainer = document.createElement("ul");
          diven.appendChild(listContainer);
          for (let row in item) {
            let li = document.createElement("li");
            li.innerText = `${row}: ${item[row]}`;
            listContainer.appendChild(li);
          
        }
      });
    };
  } 
}
  

export default ListaExpenses;
