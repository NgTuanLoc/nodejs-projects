import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name should not be empty"],
  },
  price: {
    type: Number,
    required: [true, "price should not be empty"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "VALUE is not supported",
    },
  },
});

export default mongoose.model("Product", productSchema, "products");
