import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ handleToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"https://site--vinted--kxz75bb7sdlb.code.run/user/login",
				{
					email: email,
					password: password,
				}
			);
			if (response.data.token) {
				// Cookies.set("token", response.data.token);
				handleToken(response.data.token);
				navigate("/");
			}
		} catch (error) {
			console.log(error.response.data.message);
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<div className="signup-container">
			<h2>Se connecter</h2>
			<form className="signup-form" onSubmit={handleSubmit}>
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
