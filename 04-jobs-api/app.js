import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import colors from 'colors';

// error handler
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// router
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';

// connect to DB
import { connectDB } from './db/connect.js';

dotenv.config();
const app = express();

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
	res.send('jobs api');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(
				colors.green.bgBlue.bold(`Server is listening on port ${port}...`)
			)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
