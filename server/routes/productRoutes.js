import Express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getSingleProduct,
  testing,
} from "../controller/productController.js";

export default Express.Router()

  .get("/pro", testing)
  .post("/createProduct", createProduct)
  .get("/getAllProducts", getAllProducts)
  .get("/getSingleProduct/:id", getSingleProduct)
  .put("/editProduct/:id", editProduct)
  .delete("/deleteProduct/:id", deleteProduct);
