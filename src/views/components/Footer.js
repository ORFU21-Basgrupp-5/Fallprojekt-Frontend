let Footer = {
    render: async () => {
        let view = `
        <footer class="site-footer">
            <h3>Johannas budget-app</h3>
                <ul class="socials">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
                </ul>
                <div class="footer-bottom">
                <p>@Copyright Grupp 5- All Right Reserved.  </p>
            </div>
        </footer>
        `
        return view
    },
    after_render: async () => {}
}

export default Footer
