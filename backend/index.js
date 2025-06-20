import express from 'express';
import connectDB from './config/db-config.js';
import dotenv from 'dotenv';
import router from './routes/vehicle_route.js';
import cors from 'cors';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
// Middleware

app.use(cors({
  origin: 'http://localhost:5173', 
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;