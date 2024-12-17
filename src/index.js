const express = require("express");
const cors = require("cors");
const routers = require("./routes");
const morgan = require('morgan');

const app = express();
const PORT = 3005;

app.use(morgan('combined'))

app.use(
  cors({
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use(routers);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});