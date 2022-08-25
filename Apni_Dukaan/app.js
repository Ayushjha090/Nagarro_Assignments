require('dotenv').config();
const express = require("express");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("connect-flash");
const mongoose = require('mongoose');

const OrderCount = require("./models/orderCount");
const initializePassport = require('./config/passportConfig');

const app = express();

const dbURL = process.env.DATABASE_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

app.use(
  require("express-session")({
    secret: `${process.env.SESSION_SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

var indexRoutes = require("./routes/index");
var productRoutes = require("./routes/product");
var reviewRoutes = require("./routes/review");
var cartRoutes = require("./routes/cart");
var checkoutRoutes = require("./routes/checkout");
var orderRoutes = require("./routes/order");

app.use(indexRoutes);
app.use(productRoutes);
app.use(reviewRoutes);
app.use(cartRoutes);
app.use(checkoutRoutes);
app.use(orderRoutes);

OrderCount.find({}, function (err, orderCountObjects) {
  if (orderCountObjects.length == 0) {
    OrderCount.create({ count: 0 });
  }
});

app.listen(process.env.PORT, ()=>{
  console.log(`Server is up and running on port ${process.env.PORT}...`);
});
