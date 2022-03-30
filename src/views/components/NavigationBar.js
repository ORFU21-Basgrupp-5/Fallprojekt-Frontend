let NavigationBar = {
    render: async (logedin) => {
        let view = `
            <div class="container">
                <div id="header" class="navigation-menu">
                    <a class"nav-item" href="./#/inmatning">Inmatning</a>
                    <a class"nav-item" href="./#/listaexpenses">ListaExpenses</a>
                    <a class"nav-item" href="./#/listaincomes">ListaIncomes</a>
                    <a class"nav-item" href="./#/budget">Skapa Budget</a>
                    <a class"nav-item" href="./#/getbudget">Visa Budget</a>
                    <a class"nav-item" href="./#/logout">Loga ut</a>
                </div>
            </div>
        `;
        let viewNotLogedIn = `
        <div class="container">
            <div id="header" class="navigation-menu">
                <a class"nav-item" href="./#/login">Logain</a>
                <a class"nav-item" href="./#/RegisterUser">Registera dig</a>
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
