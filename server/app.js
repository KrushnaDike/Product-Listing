import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./database.js";

// importing Routes
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database", err));

app.get("/", (req, res) => {
  res.send("Working fine...");
});

// Routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/catagory", categoryRoutes);

app.listen(2000, () => console.log("Server running on port 2000"));
