import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRouter from './routes/authRoutes.js'

dotenv.config()

const app = express();
connectDB()
app.use(express.json())
app.use(cors())

app.use('/users',authRouter)


app.get("/",(req,res)=>{
    res.send("Backend working")
})


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})