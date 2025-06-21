
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});


describe('POST /api/vehicles', () => {
  it('creates a new vehicle', async () => {
    const response = await request(app)
      .post('/api/vehicles')
      .send({
        name: 'Tempo',
        capacityKg: 300,
        tyres: 4,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Tempo');
    expect(response.body.capacityKg).toBe(300);
  });

  it('returns 400 for missing fields', async () => {
    const response = await request(app)
      .post('/api/vehicles')
      .send({ name: '', capacityKg: '', tyres: '' });

    expect(response.statusCode).toBe(400); // or whatever you defined
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
