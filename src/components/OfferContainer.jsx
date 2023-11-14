const OfferContainer = ({ offers, id }) => {
	console.log(offers);
	const offerId = offers._id === id ? offers : null;
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
						{offerId.product_details.map((detail, index) => {
							return (
								<li key={index}>
									<span>{Object.keys(detail)}</span>
									<span>{Object.values(detail)}</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="divider"></div>
				<div className="offer-content">
					<p className="name">{offerId.product_name}</p>
					<p className="description">{offerId.product_description}</p>
					<div className="offer-avatar-username">
						{offerId.owner &&
						offerId.owner.account &&
						offerId.owner.account.avatar &&
						offerId.owner.account.avatar.secure_url ? (
							<img src={offerId.owner.account.avatar.secure_url} alt="avatar" />
						) : null}
						<span>{offerId.owner.account.username}</span>
					</div>
				</div>
				<button>Acheter</button>
			</div>
		</div>
	);
};

export default OfferContainer;
