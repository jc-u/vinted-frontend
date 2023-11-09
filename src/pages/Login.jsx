import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/user/login",
				{
					email: email,
					password: password,
				}
			);
			if (response.data.token) {
				Cookies.set("token", response.data.token, { expires: 7 });
				setLoggedIn(true);
			}
		} catch (error) {
			console.log(error.response.data.message);
			setErrorMessage(error.response.data.message);
		}
	};

	return loggedIn ? (
		<Navigate to="/" />
	) : (
		<div className="signup-container">
			<h2>Se connecter</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Adresse email"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<span className="signup-login-error-message">{errorMessage}</span>
				<button type="submit">Se connecter</button>
				<Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
			</form>
		</div>
	);
};

export default Login;
