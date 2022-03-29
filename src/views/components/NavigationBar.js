let NavigationBar = {
    render: async () => {
        let view = `
            <div class="container">
                <div id="header" class="navigation-menu">
                    <a class"nav-item" href="./#/inmatning">Inmatning</a>
                    <a class"nav-item" href="./#/listaExpenses">ListaExpenses</a>
                    <a class"nav-item" href="./#/listaIncomes">ListaIncomes</a>
                    <a class"nav-item" href="./#/budget">Skapa Budget</a>
                    <a class"nav-item" href="./#/getbudget">Visa Budget</a>
                </div>
            </div>
        `
        return view
    },
    after_render: async () => {}
}

export default NavigationBar
