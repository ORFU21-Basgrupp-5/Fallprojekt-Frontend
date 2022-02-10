import { render as listRender } from "./lista.js";
import { render as inmatningRender} from "./inmatning.js";

const pageContent = document.getElementById('pageContent')

export class Header {
    constructor(){
        const button1 = document.getElementById('buttonLista')
        const button2 = document.getElementById('buttonInmatning')
        const button3 = document.getElementById('buttonRegistrera')

        button1.addEventListener('click', () => {
            listRender(pageContent)
        })
        button2.addEventListener('click', () => {
            inmatningRender(pageContent)
        })
        button3.addEventListener('click', () => {
            changePage('page3')
        })
    }
}