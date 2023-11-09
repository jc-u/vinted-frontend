const OfferContainer = ({ offers, id }) => {
	const offerId = offers.find((offer) => offer._id === id);
	return (
		<div className="offer-container">
			<div className="offer-pictures">
				<img
					src={offerId.product_image.secure_url}
					alt={offerId.product_name}
				/>
			</div>
			<div className="offer-infos">
				<div>
					<span className="offer-price">{offerId.product_price} €</span>

					<ul className="offer-list">
						<li>
							<span>MARQUE</span>
							<span>
								{offerId.product_details[0].MARQUE
									? offerId.product_details[0].MARQUE
									: ""}
							</span>
						</li>
						<li>
							<span>TAILLE</span>
							<span>
								{offerId.product_details[1].TAILLE
									? offerId.product_details[1].TAILLE
									: ""}
							</span>
						</li>
						<li>
							<span>ETAT</span>
							<span>
								{offerId.product_details[2].ÉTAT
									? offerId.product_details[2].ÉTAT
									: ""}
							</span>
						</li>
						<li>
							<span>COULEUR</span>
							<span>
								{offerId.product_details[3].COULEUR
									? offerId.product_details[3].COULEUR
									: ""}
							</span>
						</li>
						<li>
							<span>EMPLACEMENT</span>
							<span>
								{offerId.product_details &&
								offerId.product_details[4] &&
								offerId.product_details[4].EMPLACEMENT !== undefined
									? offerId.product_details[4].EMPLACEMENT
									: ""}
							</span>
						</li>
						<li>
							<span>MODE DE PAIEMENT</span>
							<span>CARTE BANCAIRE, PAYPAL</span>
						</li>
					</ul>
				</div>
				<div className="divider"></div>
				<div className="offer-content">
					<p className="name">{offerId.product_name}</p>
					<p className="description">{offerId.product_description}</p>
					<div className="offer-avatar-username">
						<img
							src={offerId.owner.account.avatar.secure_url}
							alt={offerId.product_name}
						/>
						<span>{offerId.owner.account.username}</span>
					</div>
				</div>
				<button>Acheter</button>
			</div>
		</div>
	);
};

export default OfferContainer;
