import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

// error handler
import { notFound as notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// controller
import { sendEmail } from './controllers/sendEmail.js';

dotenv.config();
const app = express();

app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('<h1>Email Project</h1> <a href="/send">Send Email</a>');
});

app.get('/send', sendEmail);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
