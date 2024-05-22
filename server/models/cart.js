const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = new mongoose.Schema({
    customerID: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
  },
  itemID: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
  },
  quantity: {
      type: Number,
      default: 1
  },
  price: {
    type: Number
  },
  timestamp: {
      type: Date,
      default: Date.now
  }
});


module.exports = mongoose.model("cart", cartSchema);
