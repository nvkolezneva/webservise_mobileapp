var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(
  "mongodb+srv://contacts:contacts@cluster0.w0e9n.mongodb.net/contacts?retryWrites=true&w=majority"
);

app.use(logger("dev"));
app.use(cors({ exposedHeaders: ["Content-Range"] }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set("Content-Range", 100);
  next();
});

const ContactSchema = mongoose.Schema({
  name: String,
  description: String,
  id: { type: Number, required: true, index: true, unique: true },
  phone: String,
  email: String,
});

const Contact = mongoose.model("contacts", ContactSchema);

app.get("/contacts", function (req, res, next) {
  Contact.find()
    .then(function (data) {
      return res.send(data);
    })
    .catch(next);
});

app.get("/contacts/:id", function (req, res, next) {
  const id = req.params.id;
  Contact.findOne({ id })
    .then(function (data) {
      return res.send(data);
    })
    .catch(next);
});

app.delete("/contacts/:id", function (req, res, next) {
  Contact.deleteOne({ id: req.params.id })
    .then(function (data) {
      console.log(data);
      return res.send({ id: req.params.id });
    })
    .catch(next);
});

app.put("/contacts/:id", function (req, res, next) {
  Contact.updateOne({ id: req.params.id }, req.body)
    .then(function (data) {
      return res.send(req.body);
    })
    .catch(next);
});

app.post("/contacts", function (req, res) {
  contact = new Contact(req.body);
  contact.save(function (err) {
    if (err) return res.send(err);
    return res.send(req.body);
  });
});

app.use(function (next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.sendStatus(err.status || 500);
});

module.exports = app;
