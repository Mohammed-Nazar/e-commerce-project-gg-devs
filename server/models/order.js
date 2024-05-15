const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        itemId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
            type: Number,
          },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);