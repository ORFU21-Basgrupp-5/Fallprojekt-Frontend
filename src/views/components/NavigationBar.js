let NavigationBar = {
    render: async (logedin) => {
        let view = `
            <div class="container">
                <div id="header" class="navigation-menu">
                <ul id="navbar">
                <li><a class"button" href="./#/inmatning">Inmatning</a></li>
                <li><a class"button" href="./#/listaexpenses">ListaExpenses</a></li>
                <li><a class"button" href="./#/listaincomes">ListaIncomes</a></li>
                <li><a class"button" href="./#/budget">Skapa Budget</a></li>
                <li><a class"button" href="./#/getbudget">Visa Budget</a></li>
                <li><a class"button" href="./#/logout">Loga ut</a></li>
                    </ul>
                </div>
            </div>
        `;
        let viewNotLogedIn = `
        <div class="container">
            <div id="header" class="navigation-menu">
            <ul id="navbar">
            <li><a href="./#/login" class"button">Logain</a></li>
            <li><a class"button" href="./#/RegisterUser">Registera dig</a></li>
            </ul>
                
                
            </div>
        </div>
    `;
    //if user is loged in we will show menu with links to the difrent pages, other wise we just show login and registera for now
    if(logedin === true)
        return view
        else
        {
            return viewNotLogedIn;
        }
    },
    after_render: async () => {}
}

export default NavigationBar
