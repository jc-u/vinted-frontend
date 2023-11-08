import imgDechire from "../assets/img/dechire.svg";

const Hero = () => {
	return (
		<div className="home-hero-bg-img">
			<img src={imgDechire} alt="effet-déchiré" />
			<div>
				<div className="home-hero-ready">
					<h2>Prêts à faire du tri dans vos placards ?</h2>
					<button>Commencez à vendre</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
