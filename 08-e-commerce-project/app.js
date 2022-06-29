import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import colors from 'colors';

// Useful Middleware
import morgan from 'morgan';

// Error Middleware
import { notFound as notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// Connect to database
import { connectDB } from './db/connect.js';

// config
dotenv.config();

colors.setTheme({
	server: ['brightGreen', 'bgBrightMagenta', 'bold'],
	database: ['brightGreen', 'bgBrightCyan', 'bold'],
	error: ['bgBrightRed', 'underline'],
});
const PORT = process.env.PORT || 3000;

// express
const app = express();

// middleware
app.use(morgan('tiny'));
app.use(express.json());

// Route
app.get('/', (req, res) => {
	res.status(200).send('E-COMMERCE API');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, console.log(`Server is listening on port ${PORT}`.server));
	} catch (error) {
		console.log(`${error}`.error);
	}
};

start();
