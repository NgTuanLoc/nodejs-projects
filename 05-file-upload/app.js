import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import morgan from 'morgan';

// database
import { connectDB } from './db/connect.js';

// error handler
import { notFound as notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// route
import productRouter from './routes/productRoutes.js';

// config
dotenv.config();
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.send('<h1>File Upload Starter</h1>');
});
app.use('/api/v1', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);

		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
