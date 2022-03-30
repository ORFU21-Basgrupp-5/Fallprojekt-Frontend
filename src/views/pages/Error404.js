let Error404 = {

    render : async () => {
        let view =  /*html*/`
        <div class="container">
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        </div>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;