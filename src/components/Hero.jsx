import imgDechire from "../assets/img/dechire.svg";
import { Link } from "react-router-dom";

const Hero = ({ token }) => {
	return (
		<div className="home-hero-bg-img">
			<img src={imgDechire} alt="effet-déchiré" />
			<div>
				<div className="home-hero-ready">
					<h2>Prêts à faire du tri dans vos placards ?</h2>
					<button>
						<Link to={token ? "/publish" : "/login"}>Commencez à vendre</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
