import NavImage from '../Images/Asset_2port.svg';

const Footer = () => {
	return (
        
            <footer className="bottom-0 p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 ">
                    <ul className="socials">
                        <li><a href="www.facebook.com"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="www.twitter.com"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="www.linkedin.com"><i className="fa fa-linkedin-square"></i></a></li>
                    </ul>
                    <div className="footer-bottom">
                    <h3>Johannas budget-app</h3>
                    <p>@Copyright Grupp 5- All Right Reserved.  </p>
                </div>
            </footer>
    	);
};
export default Footer;
