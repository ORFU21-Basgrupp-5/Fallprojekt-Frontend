"use strict";

import Home from './views/pages/home.js';
import Inmatning from './views/pages/Inmatning.js';
import Error404 from './views/pages/Error404.js';
import listaExpenses from './views/pages/listaExpenses.js';
import Login from './views/pages/Login.js';
import register from './views/pages/reg.js';
//import Login from './src/views/pages/login.js';
//import Budget from './src/views/pages/budget.js';

import NavigationBar from './views/components/NavigationBar.js';
import Footer from './views/components/Footer.js';

import routerService from './services/routerService.js'
import { defaultRender } from "./services/errorHandler.js";
import API_Service from './services/API_Service.js';


const routes = {
    '/'                 : Home
    , '/inmatning'      : Inmatning
    , '/budget'         : Home
    , '/register'       : register
    , '/listaexpenses'  : listaExpenses
    , '/login'  : Login

};

const router = async () => {

    const header = null || document.getElementById('headerContent');
    const content = null || document.getElementById('pageContent');
    const footer = null || document.getElementById('footerContent');

    header.innerHTML = await NavigationBar.render();
    await NavigationBar.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    let request = routerService.parseRequestURL()
    console.log(request);
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    console.log(parsedURL);
    let page = routes[parsedURL] ? routes[parsedURL] : Error404

    content.innerHTML = await page.render();
    await page.after_render();

}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);