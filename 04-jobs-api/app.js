import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import colors from 'colors';

// swagger UI
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

// extra security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

// error handler
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { authMiddleware } from './middleware/authentication.js';

// router
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';

// connect to DB
import { connectDB } from './db/connect.js';

dotenv.config();
const swaggerDocument = YAML.load('./document.yaml');
const app = express();

app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	})
);

// routes
app.get('/', (req, res) => {
	res.send('<h1>Jobs API</h1><a href="/document">Read Document</a>');
});
app.use('/document', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobsRouter);

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
