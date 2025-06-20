import mongoose from 'mongoose';
import Vehicle from './vehicle_model.js'; 
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
export default Booking;