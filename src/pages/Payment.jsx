import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

// Je me connecte à mon compte Stripe en utilisant ma clf publique
const stripePromise = loadStripe(
	"pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
	const location = useLocation();

	// Access the state object from location
	const { title, price, id } = location.state;
	console.log(title, price, id);

	return token ? (
		// Elements doit englober toute ma logique de paiement, je lui donne stripePromise en props pour lui montrer que je suis connecté à mon compte Stripe

		<Elements stripe={stripePromise}>
			<CheckoutForm title={title} price={price} id={id} />
		</Elements>
	) : (
		<Navigate to="/login" />
	);
};

export default Payment;
