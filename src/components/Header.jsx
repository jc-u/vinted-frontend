import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Range } from "react-range";

const Header = ({
	token,
	handleToken,
	search,
	setSearch,
	priceFilter,
	setPriceFilter,
	priceRange,
	setPriceRange,
}) => {
	const handleCheckboxChange = () => {
		setPriceFilter((prevPriceFilter) =>
			prevPriceFilter === "asc" ? "desc" : "asc"
		);
	};

	const handleSliderChange = (newPriceRange) => {
		setPriceRange(newPriceRange);
	};

	return (
		<header>
			<div className="header-container">
				<Link to="/">
					<div>
						<img className="header-logo" src={logo} alt="logo-vinted" />
					</div>
				</Link>
				<div className="search-container">
					<input
						type="text"
						className="search-input"
						placeholder="Recherche des articles"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value);
						}}
					/>
					<FontAwesomeIcon icon="magnifying-glass" />
					<div className="filter">
						<div className="filter-container">
							<span className="filter-price">Trier par prix</span>
							<span className="checkbox">
								<label
									className={`checkbox ${
										priceFilter === "desc" ? "checked" : ""
									}`}>
									<input
										type="checkbox"
										name="price"
										checked={priceFilter === "desc"}
										onChange={handleCheckboxChange}
									/>
									<div className="wrapper">
										<div className="knob">
											<span>{priceFilter === "desc" ? "⇣" : "⇡"}</span>
										</div>
									</div>
								</label>
							</span>

							<div className="price-range">
								<span>Prix entre :</span>
								<Range
									step={1}
									min={0}
									max={500}
									values={priceRange}
									onChange={handleSliderChange}
									renderTrack={({ props, children }) => (
										<div
											onMouseDown={props.onMouseDown}
											onTouchStart={props.onTouchStart}
											style={{
												...props.style,
												height: "36px",
												display: "flex",
												width: "50%",
											}}>
											<div
												ref={props.ref}
												style={{
													height: "5px",
													width: "100%",
													borderRadius: "4px",
													background: `linear-gradient(to right, rgb(204, 204, 204) 0%, rgb(204, 204, 204) ${
														(priceRange[0] / 500) * 100
													}%, rgb(44, 177, 186) ${
														(priceRange[0] / 500) * 100
													}%, rgb(44, 177, 186) ${
														(priceRange[1] / 500) * 100
													}%, rgb(204, 204, 204) ${
														(priceRange[1] / 500) * 100
													}%, rgb(204, 204, 204) 100%)`,
													alignSelf: "center",
												}}>
												{children}
											</div>
										</div>
									)}
									renderThumb={({ props, value }) => (
										<div
											{...props}
											style={{
												...props.style,
												position: "absolute",
												zIndex: value === priceRange[0] ? 1 : 0,
												cursor: "grab",
												userSelect: "none",
												touchAction: "none",
												height: "15px",
												width: "15px",
												borderRadius: "50%",
												backgroundColor: "rgb(44, 177, 186)",
												outline: "none",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												transform: `translate(${
													value === priceRange[0] ? "-8.5px" : "307.5px"
												}, -6px)`,
												border: "1px solid white",
											}}>
											<div
												style={{
													height: "8px",
													width: "8px",
													backgroundColor: "#rgb(44, 177, 186)",
													borderRadius: "50%",
												}}
											/>
											<div
												style={{
													position: "absolute",
													top: "-28px",
													color: "rgb(255, 255, 255)",
													fontSize: "12px",
													fontFamily: "'Maison Neue'",
													padding: "4px",
													borderRadius: "4px",
													backgroundColor: "rgb(44, 177, 186)",
												}}>
												{value}
											</div>
										</div>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
				{token ? (
					<button
						className="button-logout"
						onClick={() => {
							handleToken(null);
						}}>
						Déconnexion
					</button>
				) : (
					<>
						<div className="connexion">
							<button className="button-login-signup button-signup">
								<Link to="/signup">S'inscrire</Link>{" "}
							</button>
							<button className="button-login-signup button-login">
								<Link to="/login">Se connecter</Link>
							</button>
						</div>
					</>
				)}
				<button className="button-sold">Vends tes articles</button>
			</div>
		</header>
	);
};

export default Header;
