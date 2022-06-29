import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import colors from 'colors';

// Connect to database
import { connectDB } from './db/connect.js';

dotenv.config();

colors.setTheme({
	server: ['brightGreen', 'bgBrightMagenta', 'bold'],
	database: ['brightGreen', 'bgBrightCyan', 'bold'],
	error: ['bgBrightRed', 'underline'],
});

const app = express();
const PORT = process.env.PORT || 3000;

// Route
app.get('/', (req, res) => {
	res.send('E-COMMERCE API');
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, console.log(`Server is listening on port ${PORT}`.server));
	} catch (error) {
		console.log(`${error}`.error);
	}
};

start();
