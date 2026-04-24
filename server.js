const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { verifyCertificate } = require("./controllers/uploadController");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API route for verification
app.post("/verify", verifyCertificate);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
