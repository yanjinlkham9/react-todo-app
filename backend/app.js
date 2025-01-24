const express = require("express");
const app = express();
const PORT = 8080;
const sequelize = require("./models");
const indexRouter = require("./routes");
const serverPerfix = "/api-server";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// /api-server
app.use(serverPerfix, indexRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
