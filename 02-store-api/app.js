import express from "express";
import dotenv from "dotenv";

import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { connectDB } from "./db/connect.js";
import router from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to store api");
});
app.use("/api/v1/products", router);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // Connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {}
};

start();
