const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
     customerRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'},
    items: [
      {
        itemId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
