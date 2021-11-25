// this file will handle connection logic to the mongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/EasyDraw', {useNewUrlParser: true}).then(() =>{
  console.log("connected to MongoDB successfully :)")
}).catch((e) => {
  console.log("Error while trying to connect to MongoDB")
  console.log(e)
});

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose
};
