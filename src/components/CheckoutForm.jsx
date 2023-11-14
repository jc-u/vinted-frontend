import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price, id }) => {
	console.log(title, price, id);
	const [isLoading, setIsLoading] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

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
				"https://lereacteur-vinted-api.herokuapp.com/payment",
				{
					amount: price,
					currency: "eur",
					description: title,
					source: stripeToken,
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
		<form onSubmit={handleSubmit}>
			<h1>Formulaire de paiement</h1>
			<CardElement />

			{succeeded ? (
				<p>Paiement validé</p>
			) : (
				<input type="submit" value="Acheter" disabled={isLoading} />
			)}
		</form>
	);
};

export default CheckoutForm;
