import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';



// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

//api endpoints
app.use('/api/food', foodRouter);
app.use("/images", express.static("uploads"));

// api routes
app.get('/', (req, res) => res.status(200).send('API Working'));

// listen
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));