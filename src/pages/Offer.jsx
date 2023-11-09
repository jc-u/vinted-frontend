import OfferContainer from "../components/OfferContainer";
import { useParams } from "react-router-dom";

const Offer = ({ data }) => {
	const { id } = useParams();

	return (
		<div className="offer-body">
			<OfferContainer offers={data.offers} id={id} />
		</div>
	);
};

export default Offer;
