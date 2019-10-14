const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const app = express();

const mongodb = require('./config/keys').mongoURI;
mongoose.connect(mongodb, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var UsersModel = mongoose.model('users', new Schema({
  name: String,
  email: String,
  password: String,
  date: Date
}));

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

var PropertiesModel = mongoose.model('properties', new Schema({
  name: String,
  description: String,
  location: {
    type: pointSchema,
    required: true
  },
  sold_price: String,
  currency: String,
  images: [String],
  type: String
}));

app.get('/showproperties', (req, res) => {
  PropertiesModel.find(function(err, properties) {
    res.json(properties);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/saveproperty', (req, res) => {
  var coord = req.body.coordinates;
  var temp = coord.split(",");
  var coords = [];
  coords[0] = Number(temp[0]);
  coords[1] = Number(temp[1]);

  var img = req.body.images;
  var imgs = img.split(",");

  let point = {
    type: req.body.ptype,
    coordinates: coords
  }
  let property = new PropertiesModel({
    name: req.body.name,
    description: req.body.description,
    location: point,
    sold_price: req.body.price,
    currency: req.body.currency,
    images: imgs,
    type: req.body.type
  });
  property.save();
  res.send("success");
});

app.post('/register',
  [check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  check('password_confirmation', 'Passwords do not match').custom((value, {req}) => {
    if(value !== req.body.password_confirmation) {
      throw new Error("Passwords do not match");
    } else {
      return value;
    }
  })],
  (req, res) => {
    const env = {};
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      env["error"] = errors;
      res.json(env);
    } else {
      let user = new UsersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: new Date()
      });

      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash) {
          if(err) {
            env["error"] = err;
            res.json(env);
          } else {
            UsersModel.find({email: req.body.email}, function(err, data) {
              if(err) {
              } else if(data.length == 0) {
                user.password = hash;
                user.save();
                env["success"] = "register successful";
                res.json(env);
              } else {
                env["error"] = "Email already exists!";
                res.json(env);
              }
            });
          }
        });
      });
  }
});

app.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty()],
  (req, res) => {
    const env = {};
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      env["error"] = errors;
      res.json(env);
    } else {
      UsersModel.find({email: req.body.email}, function(err, data) {
        if(err) {
          env["error"] = err;
          res.json(env);
        }
        if(data.length == 0) {
          env["error"] = "The user does not exist";
          res.json(env);
        } else {
        bcrypt.compare(req.body.password, data[0].password, function(error, result) {
          if(!result) {
            env["error"] = "Wrong credentials";
            res.json(env);
          } else {
            env["success"] = "login successful";
            res.json(env);
          }
        }); }
      });
    }
  }
);

app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
