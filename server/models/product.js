import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Category from "../models/category.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
  },
});

Product.belongsTo(Category, { foreignKey: "categoryId" });

export default Product;
