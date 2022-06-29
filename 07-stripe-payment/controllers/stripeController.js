import Stripe from 'stripe';

const stripe = new Stripe(
	'sk_test_51LFrCHFgPtGImR817Koa05dEjf3y6P07Jc7RiaX0CQ5TaFDuypNWRmczk1ihifmeEo3mUtba6NrQyOx9yydObDVT00JppL1b2m',
	{
		apiVersion: '2020-08-27',
	}
);

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
