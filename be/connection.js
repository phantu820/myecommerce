const mongoose = require('mongoose');

const connectionStr = "mongodb://127.0.0.1:27017/my-ecommerce";

mongoose.connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
