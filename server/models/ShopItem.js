const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  availableCount: { type: Number, required: true },
  genre: { type: Array, required: true }
})

module.exports = mongoose.model("shopItem", shopItemSchema);
