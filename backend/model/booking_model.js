const mongoose = require('mongoose');
const Vehicle = require('./vehicle_model'); // Assuming vehicle_model.js is in the same directory

const bookingSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },

  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  customerId: {
    type:String,
    required: true
  }
}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;