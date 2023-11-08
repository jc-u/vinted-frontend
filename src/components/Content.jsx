const Content = ({ offers }) => {
	return (
		<div className="home-card-wrapper">
			{offers.map((offer) => {
				console.log(offer);
				return (
					<div key={offer.id} className="card-container">
						<div className="card-avatar-username">
							{/* <img src={offer.owner.account.avatar.secure_url} alt="avatar" /> */}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Content;
