import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
	const [picture, setPicture] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const [condition, setCondition] = useState("");
	const [place, setPlace] = useState("");
	const [price, setPrice] = useState("");
	const [exchange, setExchange] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("brand", brand);
			formData.append("size", size);
			formData.append("color", color);
			formData.append("condition", condition);
			formData.append("city", place);
			formData.append("price", price);
			formData.append("picture", picture);

			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/offer/publish",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			navigate("/");
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return token ? (
		<div className="publish-main">
			<div className="publish-container">
				<h2>Vends ton article</h2>
				<form onSubmit={handleSubmit}>
					<div className="file-select">
						<div className="dashed-preview-without">
							{picture ? (
								<>
									<img
										style={{ height: "100px" }}
										src={URL.createObjectURL(picture)}
										alt=""
									/>
									<div
										onClick={() => {
											setPicture();
										}}
										className="remove-img-button">
										X
									</div>
								</>
							) : (
								<div className="input-design-default">
									<label htmlFor="file" className="label-file">
										<span className="input-sign">+</span>
										<span>Ajoute une photo</span>
									</label>
									<input
										//   multiple
										style={{ display: "none" }}
										id="file"
										type="file"
										className="input-file"
										onChange={(event) => {
											setPicture(event.target.files[0]);
										}}
									/>
								</div>
							)}
						</div>
					</div>
					<div className="text-input-section">
						<div className="text-input">
							<h4>Titre</h4>
							<input
								type="text"
								id="title"
								name="title"
								placeholder="ex: Chemise Sézane verte"
								onChange={(event) => {
									setTitle(event.target.value);
								}}
								value={title}
							/>
						</div>
						<div className="text-input">
							<h4>Décris ton article</h4>
							<textarea
								name="description"
								id="description"
								placeholder="ex: porté quelquefois, taille correctement"
								rows="5"
								value={description}
								onChange={(event) => {
									setDescription(event.target.value);
								}}></textarea>
						</div>
					</div>
					<div className="text-input-section">
						<div className="text-input">
							<h4>Marque</h4>
							<input
								type="text"
								id="selectedBrand"
								name="selectedBrand"
								placeholder="ex: Zara"
								value={brand}
								onChange={(event) => {
									setBrand(event.target.value);
								}}
							/>
						</div>
						<div className="text-input">
							<h4>Taille</h4>
							<input
								id="selectedSize"
								name="selectedSize"
								placeholder="ex: L / 40 / 12"
								type="text"
								value={size}
								onChange={(event) => {
									setSize(event.target.value);
								}}
							/>
						</div>
						<div className="text-input">
							<h4>Couleur</h4>
							<input
								id="color"
								name="color"
								placeholder="ex: Fushia"
								type="text"
								value={color}
								onChange={(event) => {
									setColor(event.target.value);
								}}
							/>
						</div>
						<div className="text-input">
							<h4>Etat</h4>
							<input
								id="wearRate"
								name="wearRate"
								placeholder="ex: Neuf avec étiquette"
								type="text"
								value={condition}
								onChange={(event) => {
									setCondition(event.target.value);
								}}
							/>
						</div>
						<div className="text-input">
							<h4>Lieu</h4>
							<input
								id="city"
								name="city"
								placeholder="ex: Paris"
								type="text"
								value={place}
								onChange={(event) => {
									setPlace(event.target.value);
								}}
							/>
						</div>
					</div>
					<div className="text-input-section">
						<div className="text-input">
							<h4>Prix</h4>
							<div className="checkbox-section">
								<input
									style={{
										WebkitAppearance: "none" /* pour WebKit/Blink */,
										MozAppearance: "textfield" /* pour Firefox */,
										appearance: "textfield",
									}}
									id="price"
									name="price"
									placeholder="0,00 €"
									type="number"
									value={price}
									onChange={(event) => {
										setPrice(event.target.value);
									}}
								/>
								<div className="checkbox-input">
									<label
										htmlFor="exchange"
										className={
											exchange ? "checkbox-design-checked" : "checkbox-design"
										}>
										{exchange ? (
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="check"
												className="svg-inline--fa fa-check fa-w-16 fa-xs "
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												color="white">
												<path
													fill="currentColor"
													d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
											</svg>
										) : null}
									</label>

									<input
										type="checkbox"
										name="exchange"
										id="exchange"
										checked={exchange}
										onChange={(event) => {
											setExchange(event.target.checked);
										}}
									/>
									<span>Je suis intéressé(e) par les échanges</span>
								</div>
							</div>
						</div>
					</div>
					<div className="form-button-div">
						<button type="submit" className="form-validation">
							Ajouter
						</button>
					</div>
				</form>
			</div>
		</div>
	) : (
		<Navigate to="/login" />
	);
};

export default Publish;
