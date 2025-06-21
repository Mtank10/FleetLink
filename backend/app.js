const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db-config');
const router = require('./routes/vehicle_route.js'); // Adjust the path as necessary
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
// Middleware

app.use(cors({
  origin: 'https://fleetlink-wg1k.onrender.com', 
  credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
connectDB();



// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api', router);


module.exports = app;