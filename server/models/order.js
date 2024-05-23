const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customer: {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String }
  },
  items: {type: Array},
  status: { type: String, required: true, default: "In progress" },
  shipping: {
    country: { type: String, required: true },
    address: { type: String, required: true },
  },
  orderDates: {
    created: { type: Date, default: Date.now },
    paid: { type: Date },
    shipped: { type: Date },
    delivered: { type: Date }
  },
  note: {type: String},
  totalPaid: {type: String, required: true}
});

module.exports = mongoose.model('Order', orderSchema);
