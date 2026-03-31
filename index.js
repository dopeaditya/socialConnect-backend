import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';

dotenv.config()

const app = express();
connectDB()
app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'],
    credentials:true
}
))   // {origin:'', credentials:true}

app.use('/users',authRouter)
app.use('/posts', postRoutes)


app.get("/",(req,res)=>{
    res.send("Backend working")
})


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})