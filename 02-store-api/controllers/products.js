import Product from "../models/product.js";

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("name");
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let results = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join("");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }
  const products = await results;

  res.status(200).json({ products, nHits: products.length });
};

export { getAllProductsStatic, getAllProducts };
