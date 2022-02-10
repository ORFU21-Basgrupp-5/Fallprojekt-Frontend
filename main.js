import { render as listRender } from "./lista.js";
import { render as inmatningRender} from "./inmatning.js";
import { Header } from "./header.js";

const header = new Header();


const pageContent = document.getElementById('pageContent')
//listRender(pageContent);

// switch (newPage) {
//     case 'inmatning':
//         inmatningRender(pageContent)
//         break;
//     case 'lista':
//         listaRender(pageContent)
//         break;
//     case 'registrering':
//         registreringRender(pageContent)
//         break;

//     default:
//         break;
// }