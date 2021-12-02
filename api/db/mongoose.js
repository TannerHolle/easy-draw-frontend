// this file will handle connection logic to the mongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/** If we are connecting to mongo Atlas */
mongoose.connect('mongodb+srv://admin:EasyDrawAdmin@easydraw.kh14q.mongodb.net/EasyDraw?retryWrites=true&w=majority').then(() =>{
    console.log("connected to MongoDB successfully :)")
  }).catch((e) => {
    console.log("Error while trying to connect to MongoDB")
    console.log(e);
  });

/** If we are connecting to a mongo db on the local machine */
// mongoose.connect('mongodb://localhost:27017/EasyDraw', {useNewUrlParser: true}).then(() =>{
//   console.log("connected to MongoDB successfully :)")
// }).catch((e) => {
//   console.log("Error while trying to connect to MongoDB")
//   console.log(e)
// });

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose
};
