import logo from "../assets/img/logo.png";
import imgDechire from "../assets/img/dechire.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
	return (
		<header>
			<div className="header-container">
				<div>
					<img src={logo} alt="logo-vinted" />
				</div>
				<div className="search-container">
					<input
						type="text"
						className="search-input"
						placeholder="Recherche des articles"
					/>
					<FontAwesomeIcon icon="magnifying-glass" />
					<div className="filter"></div>
				</div>
				<div className="connexion">
					<button className="button-login-signup button-signup">
						S'inscrire
					</button>
					<button className="button-login-signup button-login">
						Se connecter
					</button>
				</div>
				<button className="button-sold">Vends tes articles</button>
			</div>
		</header>
	);
};

export default Header;
