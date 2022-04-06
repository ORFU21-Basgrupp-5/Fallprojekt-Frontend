let Footer = {
    render: async () => {
        let view = `
        <div class="container">
        
            <footer class="site-footer">
               
                <img id="footerPicture" src = "./images/Asset_2port.svg" "/>
                    <ul class="socials">
                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
                    </ul>
                    <div class="footer-bottom">
                    <h3>Johannas budget-app</h3>
                    <p>@Copyright Grupp 5- All Right Reserved.  </p>
                </div>
            </footer>
        </div>
        `
        return view
    },
    after_render: async () => {}
}

export default Footer
