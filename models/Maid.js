const mongoose = require('mongoose');

const maidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Indian 10-digit mobile number validation
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  aadhaarCard: {
    type: String, // Store filename or file path
    required: false,
  },
});

const Maid = mongoose.model('Maid', maidSchema);

module.exports = Maid;
