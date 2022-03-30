"use strict";
//pages
import Budget from '/views/pages/Budget.js';
import ChangePassword from '/views/pages/ChangePassword.js';
import Error404 from '/views/pages/Error404.js';
import GetBudget from '/views/pages/getbudget.js';
import Home from '/views/pages/home.js';
import Inmatning from '/views/pages/Inmatning.js';
import ListaExpenses from '/views/pages/listaExpenses.js';
import ListaIncomes from '/views/pages/ListaIncomes.js';
import Login from '/views/pages/Login.js';
import RecoveryMail from '/views/pages/Recoverymail.js';
import RegisterUser from '/views/pages/reg.js';
import logout from '/views/pages/logout.js';

//components
import NavigationBar from '/views/components/NavigationBar.js';
import Footer from '/views/components/Footer.js';

//services
import routerService from '/services/routerService.js'
import { getCookie } from "/services/cookie.js";
import { removeCookies } from "/services/cookie.js";
import { defaultRender } from "/services/errorHandler.js";
import API_Service from '/services/API_Service.js';


const routes = {
    '/'                 : Home
    , '/budget'         : Budget
    , '/inmatning'      : Inmatning
    , '/changepassword' : ChangePassword
    , '/getbudget'      : GetBudget
    , '/listaexpenses'  : ListaExpenses
    , '/listaincomes'   : ListaIncomes
    , '/login'          : Login
    , '/recoverymail'   : RecoveryMail
    , '/registeruser'   : RegisterUser
    

};

const router = async () => {

    const header = null || document.getElementById('headerContent');
    const content = null || document.getElementById('pageContent');
    const footer = null || document.getElementById('footerContent');

  

    let request = routerService.parseRequestURL()
    console.log(request);
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page;
    if(parsedURL === '/logout')
    {
        removeCookies();
        page = logout       
    }
    else
    page = routes[parsedURL] ? routes[parsedURL] : Error404


    var userString = getCookie('user');
    var userLogedIn = false;
    if(userString != null) 
    userLogedIn = true;

    header.innerHTML = await NavigationBar.render(userLogedIn);
    await NavigationBar.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();


    content.innerHTML = await page.render();
    await page.after_render();

}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);