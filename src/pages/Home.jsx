import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Content from "../components/Content";

const Home = ({ search, priceFilter, priceRange }) => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let apiUrl = "https://lereacteur-vinted-api.herokuapp.com/offers";

				// Construire les paramètres de la requête en fonction des filtres
				let queryParams = [];
				if (search) {
					queryParams.push(`title=${search}`);
				}
				if (priceFilter) {
					queryParams.push(`sort=price-${priceFilter}`);
				}

				// Ajouter les paramètres au point de terminaison de l'API
				if (priceRange && priceRange.length === 2) {
					// Vérifier si le slider a été manipulé
					if (priceRange[0] !== 0 || priceRange[1] !== 500) {
						queryParams.push(`priceMin=${priceRange[0]}`);
						queryParams.push(`priceMax=${priceRange[1]}`);
					}
				}

				// Ajouter les paramètres au point de terminaison de l'API
				if (queryParams.length > 0) {
					apiUrl += `?${queryParams.join("&")}`;
				}

				// Effectuer la requête
				const response = await axios.get(apiUrl);

				let sortedOffers = [...response.data.offers];

				// Tri des offres en fonction du filtre de prix
				if (priceFilter === "desc") {
					sortedOffers.sort((a, b) => b.product_price - a.product_price);
				} else {
					sortedOffers.sort((a, b) => a.product_price - b.product_price);
				}

				// Mise à jour de l'état avec les données triées
				setData({ ...response.data, offers: sortedOffers });
				setIsLoading(false);
			} catch (error) {
				console.log(error.response.data);
			}
		};

		fetchData();
	}, [search, priceFilter, priceRange]);

	return isLoading ? (
		<span>En cours de chargement...</span>
	) : (
		<>
			<Hero />
			<Content offers={data.offers} />
		</>
	);
};

export default Home;
