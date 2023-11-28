import OfferContainer from "../components/OfferContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = ({ token }) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--vinted--kxz75bb7sdlb.code.run/offers/${id}`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [id]);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="offer-body">
			<OfferContainer offers={data} id={id} token={token} />
		</div>
	);
};

export default Offer;
