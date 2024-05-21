const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String }
  },
  items: [orderItemSchema],
  status: { type: String, required: true },
  payment: {
    method: { type: String, required: true },
    status: { type: String, required: true },
    transactionId: { type: String }
  },
  shipping: {
    address: { type: String, required: true },
    method: { type: String },
    trackingNumber: { type: String }
  },
  orderDates: {
    created: { type: Date, default: Date.now },
    paid: { type: Date },
    shipped: { type: Date },
    delivered: { type: Date }
  },
  amounts: {
    subtotal: { type: Number, required: true },
    tax: { type: Number },
    shippingCost: { type: Number },
    total: { type: Number, required: true }
  },
  discounts: {
    code: { type: String },
    amount: { type: Number }
  },
  notes: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);
