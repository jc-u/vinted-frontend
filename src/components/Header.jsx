import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
				{Cookies.get("token") ? (
					<button
						onClick={() => {
							Cookies.remove("token");
							navigate("/");
						}}
						className="button-logout">
						Se déconnecter{" "}
					</button>
				) : (
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
				)}
				<button className="button-sold">Vends tes articles</button>
			</div>
		</header>
	);
};

export default Header;
