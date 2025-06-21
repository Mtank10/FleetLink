
const request = require('supertest');
const app = require('../app');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

describe('POST /api/bookings', () => {
  let vehicle;

  beforeAll(async () => {
    vehicle = await Vehicle.create({ name: 'Tata', capacityKg: 1000, tyres: 6 });
  });

  it('should book a vehicle if available', async () => {
    const res = await request(app).post('/api/bookings').send({
      vehicleId: vehicle._id,
      fromPincode: '100001',
      toPincode: '100003',
      startTime: '2025-06-25T08:00:00Z',
      customerId: 'demo-user-123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicleId).toBe(vehicle._id.toString());
  });

  it('should return 409 if vehicle is already booked in that time', async () => {
    const res = await request(app).post('/api/bookings').send({
      vehicleId: vehicle._id,
      fromPincode: '100001',
      toPincode: '100003',
      startTime: '2025-06-25T09:00:00Z', // Overlaps with previous
      customerId: 'demo-user-456'
    });

    expect(res.statusCode).toBe(409);
  });
});
