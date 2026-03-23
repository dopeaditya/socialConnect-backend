import mongoose from "mongoose";




const connectDB = async ()=>{
    try {
        const mongoURI = process.env.MONGO_URL

        await mongoose.connect(mongoURI)
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.log(error)
        
    }
}

export default connectDB;