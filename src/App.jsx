import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
	// State dans lequel je stocke le token. Sa valeur de base sera :
	// - Si je trouve un cookie token, ce cookie
	// - Sinon, null
	const [token, setToken] = useState(
		Cookies.get("token") || null
		// Cookies.get("token") ? Cookies.get("token") : null
	);
	const [search, setSearch] = useState("");
	const [priceFilter, setPriceFilter] = useState("asc");
	const [priceRange, setPriceRange] = useState([0, 500]); // Initial values for the slider

	// Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
	const handleToken = (token) => {
		if (token) {
			Cookies.set("token", token, { expires: 15 });
			setToken(token);
		} else {
			Cookies.remove("token");
			setToken(null);
		}
	};

	return (
		<Router>
			{/* Je peux passer des props à mes composants */}
			<Header
				token={token}
				handleToken={handleToken}
				search={search}
				setSearch={setSearch}
				priceFilter={priceFilter}
				setPriceFilter={setPriceFilter}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							search={search}
							priceFilter={priceFilter}
							setPriceFilter={setPriceFilter}
							priceRange={priceRange}
							setPriceRange={setPriceRange}
						/>
					}
				/>
				<Route path="/offers/:id" element={<Offer />} />
				<Route path="/login" element={<Login handleToken={handleToken} />} />
				<Route path="/signup" element={<Signup handleToken={handleToken} />} />
			</Routes>
		</Router>
	);
}

export default App;
