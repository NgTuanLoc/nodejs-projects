import dotenv from "dotenv";

import { connectDB } from "./db/connect.js";
import Product from "./models/product.js";
import { data } from "./products.js";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(data);
    console.log("Success !!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
