//database configuration
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//https://cryptic-refuge-26436.herokuapp.com/

module.exports={
  mongoose
};
