import express from "express";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";

import tasks from "./routers/tasks.js";
import notFound from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
