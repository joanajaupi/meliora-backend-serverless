const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  // Additional fields specific to customers
  name: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true
  },
  phone: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  isDeleted: {
      type: Boolean,
      default: false
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

module.exports = mongoose.model('Customer', customerSchema);
