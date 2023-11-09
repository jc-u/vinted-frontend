import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	return (
		<header>
			<div className="header-container">
				<div>
					<img className="header-logo" src={logo} alt="logo-vinted" />
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
					<button
						onClick={() => navigate("/signup")}
						className="button-login-signup button-signup">
						S'inscrire
					</button>
					<button
						onClick={() => navigate("/login")}
						className="button-login-signup button-login">
						Se connecter
					</button>
				</div>
				<button className="button-sold">Vends tes articles</button>
			</div>
		</header>
	);
};

export default Header;
