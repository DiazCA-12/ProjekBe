const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userroutes");
const productRoutes = require("./routes/productroutes");
const purchasesRoutes = require("./routes/purchasesroutes");
const expressSwagger = require("express-swagger-generator")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/purchases", purchasesRoutes);

// Swagger config
const options = {
  swaggerDefinition: {
    info: {
      description: "API documentation for the ecommerce system",
      title: "Ecommerce API",
      version: "1.0.0",
    },
    host: "projek-be.vercel.app", // Update with your Vercel URL
    basePath: "/",
  },
  basedir: __dirname, // The directory where Swagger will look for routes
  files: ["./routes/**/*.js"], // The folder where route files are located
};

expressSwagger(options);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
