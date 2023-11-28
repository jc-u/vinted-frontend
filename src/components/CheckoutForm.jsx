import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price, id }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [succeeded, setSucceeded] = useState(false);
	console.log(id);
	const protectionFees = 0.59;
	const fees = 1.18;
	const total = price + protectionFees + fees;

	// Va nous permettre de faire une requête à Stripe pour lui envoyer les codes
	const stripe = useStripe();

	//   Pour récupérer le contenu de CardElement
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			// Je récupère le contenu de l'input
			const cardElement = elements.getElement(CardElement);

			//   J'envoie ces informations à stripe pour qu'il valide l'existence de la carte
			const stripeResponse = await stripe.createToken(cardElement, {
				name: id, // J'envoie un identifiant de ce lui qui paye pour savoir qui est à l'origine de la transaction
			});

			const stripeToken = stripeResponse.token.id;

			//   Je fais une requête à mon back et je lui envoie mon stripeToken

			const response = await axios.post(
				"https://site--vinted--kxz75bb7sdlb.code.run/payment",
				{
					amount: price,
					title: title,
					token: stripeToken,
				}
			);
			console.log(response.data);
			//   Si la réponse contient succeeded, je fais apparaitre "payment validé"
			if (response.data.status === "succeeded") {
				setSucceeded(true);
			} else {
				setIsLoading(false);
			}

			console.log(stripeToken);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="payment-wrapper">
			<div className="payment-container">
				<div className="payment-card summary">
					<div className="title">Résumé de la commande</div>
					<div className="content">
						<ul>
							<li>
								Commande
								<span>{price} €</span>
							</li>
							<li>
								Frais de protection acheteurs
								<span>{protectionFees} €</span>
							</li>
							<li>
								Frais de port
								<span>{fees} €</span>
							</li>
						</ul>
					</div>

					<div className="divider"></div>
					<div className="content">
						<ul>
							<li className="bold">
								Total
								<span>{Number(total).toFixed(2)} €</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="payment-card">
					<div className="content">
						Il ne vous reste plus qu'une étape pour vous offrir{" "}
						<span className="bold">{title}</span>. Vous allez payer{" "}
						<span className="bold">{Number(total).toFixed(2)} €</span> (frais de
						protection et frais de port inclus).
						<div className="divider"></div>
						<form onSubmit={handleSubmit}>
							<CardElement />

							{succeeded ? (
								<p>Merci pour votre achat.</p>
							) : (
								<button type="submit" value="Acheter" disabled={isLoading}>
									Pay
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutForm;
