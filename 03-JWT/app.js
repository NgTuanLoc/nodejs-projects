import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';

import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';
import router from './routes/main.js';

dotenv.config();
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', router);
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
