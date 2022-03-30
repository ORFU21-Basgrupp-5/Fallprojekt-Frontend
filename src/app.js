"use strict";
//makes this page not tollerate any errors

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

//the routing adresses and what page they are assoiated with
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
    
    //gets header etc once only
    const header = null || document.getElementById('headerContent');
    const content = null || document.getElementById('pageContent');
    const footer = null || document.getElementById('footerContent');

  
    //checks the current adress route and moves to the correct page
    let request = routerService.parseRequestURL()
    console.log(request);
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page;
    if(parsedURL === '/logout')
    {
        //if route is logout we remove cookie and displa godbyepage.
        removeCookies();
        page = logout       
    }
    else
    page = routes[parsedURL] ? routes[parsedURL] : Error404
    //if the route adress isent one of the ones in const routes then we go to the Error404 page


    //if  user is logged in we send "loged in menu to header"
    var userString = getCookie('user');
    var userLogedIn = false;
    if(userString != null) 
    userLogedIn = true;

    //if user is not logged in we send only login and register to menu
    header.innerHTML = await NavigationBar.render(userLogedIn);
    await NavigationBar.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    //send the correct page + functions that the routingservice gives us
    content.innerHTML = await page.render();
    await page.after_render();

}
//The hashchange event is fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the # symbol).
window.addEventListener('hashchange', router);

//event when page is fully loaded
window.addEventListener('load', router);