const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/database");
const food = require("./Route/food");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagerSpec");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", food);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.port || 3000;
db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
