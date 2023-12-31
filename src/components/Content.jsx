import { Link } from "react-router-dom";

const Content = ({ offers }) => {
	return (
		<div className="home-card-wrapper">
			{offers.map((offer) => {
				return (
					<Link to={`/offers/${offer._id}`} key={offer._id}>
						<div className="card-container">
							<div className="card-avatar-username">
								{offer.owner &&
								offer.owner.account &&
								offer.owner.account.avatar &&
								offer.owner.account.avatar.secure_url ? (
									<img
										src={offer.owner.account.avatar.secure_url}
										alt="avatar"
									/>
								) : null}
								<span>{offer.owner.account.username}</span>
							</div>
							<div className="card-offer">
								<img src={offer.product_image.secure_url} alt="product" />
								<div className="card-price-size-brand">
									<span>{offer.product_price} €</span>
									<span>{offer.product_details[1].TAILLE}</span>
									<span>{offer.product_details[0].MARQUE}</span>
								</div>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Content;
