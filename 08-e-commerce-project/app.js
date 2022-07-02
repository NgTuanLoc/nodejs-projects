import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import colors from 'colors';
import fileUpload from 'express-fileupload';

// Security Middleware
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';

// Useful Middleware
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/authentication.js';

// Error Middleware
import { notFound as notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// Connect to database
import { connectDB } from './db/connect.js';

// Route
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import orderRoute from './routes/orderRoute.js';

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

// security package
app.set('trust proxy', 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60,
	})
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use(express.static('./public'));
app.use(fileUpload());

// Route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', authMiddleware, userRoute);
app.use('/api/v1/products', authMiddleware, productRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/orders', authMiddleware, orderRoute);

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
