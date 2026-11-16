import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToDB from './db/connectToDB';
import authRoutes from './routes/AuthRoutes';

const app = express();
connectToDB();

app.use('/api', authRoutes);

app.listen(3000, ()=>{
    console.log('server is running');
});