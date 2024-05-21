const mongoose = require("mongoose");

// const { MONGODB_USER, MONGODB_PASSWORD, DB_HOST, DB_PORT, MONGODB_DATABASE, TEST_DB_HOST } = process.env;

// const DB_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${process.env.NODE_ENV === "test" ? TEST_DB_HOST : DB_HOST}:${DB_PORT}/${MONGODB_DATABASE}?authSource=admin`;

// const connectToMongo = () => {
//   mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//   const db = mongoose.connection;

//   db.once("open", () => {
//     console.log("Database connected: ", DB_URI);
//   });

//   db.on("error", (err) => {
//     console.error("Database connection error: ", err);
//   });
// };

const DB_URI = process.env.MONGODB_DATABASE_LIVE;
const url = DB_URI;

const connectToMongo = () => {
  mongoose.connect(url)
  .then(()=>{
    console.log("Conneted to DB");
  })
  .catch((err)=>{
    console.log(err)
  })
};


module.exports = connectToMongo;

