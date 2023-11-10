import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newsletter, setNewsletter] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setErrorMessage("");
			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/user/signup",
				{
					email: email,
					username: username,
					password: password,
					newsletter: newsletter,
				}
			);
			console.log(response.data);
			Cookies.set("token", response.data.token, { expires: 7 });
			navigate("/");
		} catch (error) {
			console.log("erreur", error.response);

			if (error.response.data.message === "Missing parameters") {
				setErrorMessage("Veuillez remplir tous les champs");
			} else if (error.response.status === 409) {
				setErrorMessage("Cet email possède déjà un compte");
			}
		}
	};

	return (
		<div className="signup-container">
			<h2>S'inscrire</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nom d'utilisateur"
					value={username}
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<input
					type="email"
					placeholder="Email"
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
				<div className="checkbox-container">
					<div>
						<input
							type="checkbox"
							value={newsletter}
							onChange={(event) => {
								setNewsletter(event.target.value);
							}}
						/>
					</div>
					<p>
						En m'inscrivant je confirme avoir lu et accepté les Termes &
						Conditions et Politique de Confidentialité de Vinted. Je confirme
						avoir au moins 18 ans.
					</p>
				</div>
				<button type="submit">S'inscrire</button>
			</form>
			<Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
		</div>
	);
};

export default Signup;
