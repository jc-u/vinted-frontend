const Content = ({ offers }) => {
	return (
		<div className="home-card-wrapper">
			{offers.map((offer) => {
				return (
					<div key={offer.id} className="card-container">
						<div className="card-avatar-username">
							{<img src={offer.owner.account.avatar.secure_url} alt="avatar" />}
							<span>{offer.owner.account.username}</span>
						</div>
						{offer.product_pictures.map((picture) => {
							return (
								<div key={picture.asset_id} className="card-offer">
									<img src={picture.secure_url} alt="product" />
									<div className="card-price-size-brand">
										<span>{offer.product_price} €</span>
										<span>{offer.product_details.TAILLE}</span>
										<span>{offer.product_details.MARQUE}</span>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Content;
