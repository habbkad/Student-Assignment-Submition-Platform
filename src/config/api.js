const mongoose = require("mongoose");

const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`connecion status: ${conn}`);
};

module.exports = connect;
