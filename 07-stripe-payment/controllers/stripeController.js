import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

export const stripeController = async (req, res) => {
	const { purchase, total_amount, shipping_fee } = req.body;
	console.log(process.env.STRIPE_SECRET_KEY);
	const calculateOrderAmount = () => {
		return total_amount + shipping_fee;
	};

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(),
		currency: 'usd',
	});

	res.json({ clientSecret: paymentIntent.client_secret });
};
