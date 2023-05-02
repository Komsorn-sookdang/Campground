const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const campgrounds = require('./routes/campground')
const bookings = require('./routes/booking')
const auth = require("./routes/auth");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.use(expressValidator);
app.use(cookieParser());

app.use('/api/v1/campgrounds', campgrounds);
app.use("/api/v1/auth", auth);
app.use('/api/v1/bookings', bookings);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
