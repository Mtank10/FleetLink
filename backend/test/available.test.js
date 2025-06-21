
const request = require('supertest');
const app = require('../app');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

describe('GET /api/vehicles/available', () => {
  let vehicle;

  beforeAll(async () => {
    vehicle = await Vehicle.create({ name: 'Mini Truck', capacityKg: 800, tyres: 4 });
  });

  it('should return available vehicle when no conflict', async () => {
    const res = await request(app).get('/api/vehicles/available').query({
      capacityRequired: 500,
      fromPincode: '100001',
      toPincode: '100003',
      startTime: '2025-06-25T10:00:00Z'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.availableVehicles).toEqual(
      expect.arrayContaining([expect.objectContaining({ _id: vehicle._id.toString() })])
    );
  });

  it('should not return vehicle if booking overlaps', async () => {
    await Booking.create({
      vehicleId: vehicle._id,
      startTime: '2025-06-25T10:00:00Z',
      endTime: '2025-06-25T12:00:00Z',
      customerId: 'cust1'
    });

    const res = await request(app).get('/api/vehicles/available').query({
      capacityRequired: 500,
      startTime: '2025-06-25T10:30:00Z'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.availableVehicles).toEqual([]); // No available vehicles due to overlap
  });
});
