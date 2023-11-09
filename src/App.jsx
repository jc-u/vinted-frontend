import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://lereacteur-vinted-api.herokuapp.com/offers"
			);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return isLoading ? (
		<span>En cours de chargement...</span>
	) : (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home data={data} />} />
					<Route path="/offer/:id" element={<Offer data={data} />} />
					<Route path="*" element={<span>404</span>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
