const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("body-parser");
require("dotenv").config();

//APp
const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//routes
 const feedbackROute= require('./routes/feedback')

 app.use('/api',feedbackROute)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
