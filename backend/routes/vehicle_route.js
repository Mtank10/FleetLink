const express = require('express');
const router = express.Router();
const Vehicle = require('../model/vehicle_model.js'); 
const Booking = require('../model/booking_model.js'); 
 


router.post('/vehicles', async (req, res) => {
    const {name,capacityKg,tyres} = req.body;
    try{
        // Validate input
        if (!name || !capacityKg || !tyres) {
            return res.status(400).json({ message: 'All fields are required' });
        }
         const capacityKg1 = parseInt(capacityKg);
        const tyres1 = parseInt(tyres);
        if (isNaN(capacityKg1) || isNaN(tyres1)) {
            return res.status(400).json({ message: 'Capacity and tyres must be numbers' });
        }
        if (capacityKg1 < 0 || tyres1 < 0) {
            return res.status(400).json({ message: 'Capacity and tyres must be non-negative' });
        }
        const vehicle = await Vehicle.create({ name, capacityKg:capacityKg1, tyres:tyres1 });
        
         res.status(201).json({
            message: 'Vehicle added successfully',
            vehicle: {
                name,
                capacityKg,
                tyres
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error: error.message });
    }
})

router.get('/vehicles/available',async (req,res)=>{
    const {capacityKg,fromPincode,toPincode,startTime} = req.query;

    const start = new Date(startTime);
    const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) %24;
    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    try{
        const vehicles = await Vehicle.find({capacityKg: {$gte:capacityKg}});
        const booking = await Booking.find({
            startTime:{
                $lt: end
            },
            endTime: {
                $gt: start
            }
        })

        const bookedVehicleIds = new Set(booking.map(b=>b.vehicle.toString()));
        const availableVehicles = vehicles.filter(vehicle => !bookedVehicleIds.has(vehicle._id.toString()));

        return res.status(200).json({
            message: 'Available vehicles found',
            availableVehicles, 
            estimatedRideDurationHours: estimatedRideDurationHours,
            searchData: {
                capacityKg,
                startTime,
                fromPincode,
                toPincode
            }
        })

    }catch (error) {
        return res.status(500).json({ message: 'Error fetching available vehicles', error: error.message });
    }


})

router.post('/bookings',async (req,res)=>{
    const {vehicleId,startTime,customerId,fromPincode,toPincode} = req.body;

    const start = new Date(startTime);
    const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        const conflict = await Booking.findOne({
            vehicle: vehicleId,
            startTime: { $lt: end },
            endTime: { $gt: start }
        })
        if (conflict) {
            return res.status(403).json({ message: 'Vehicle is already booked for the selected time' });
        }
        const booking = await Booking.create({
            vehicle: vehicleId,
            startTime: start,
            endTime: end,
            customerId
        });

        return res.status(201).json({
            message: 'Booking created successfully',
            booking: {
                vehicle: vehicle.name,
                startTime: booking.startTime,
                endTime: booking.endTime,
                customerId
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
})

router.delete('/bookings/:id', async (req, res) => {
  const deleted = await Booking.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Booking not found' });
  return res.status(200).json({ message: 'Booking cancelled' });
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('vehicle', 'name');
    bookings.forEach(booking => {
      booking.startTime = booking.startTime.toISOString();
      booking.endTime = booking.endTime.toISOString();
    });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

module.exports = router;
