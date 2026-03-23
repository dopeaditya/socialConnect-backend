import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../services/emailService.js';


export const registerUser = async(req,res)=>{
    try {
        const {username, email, phone, password} = req.body

        const existUser = await User.findOne({name:username})

        if(existUser){
            return res.status(400).json({message:"User already exists with the given email"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
                                        name:username,
                                        email,
                                        phone,
                                        password:hashedPassword
        });

        await sendEmail(email,"Welcome to our website",
            `<div>Welcome to SocialConnect ${username}</div>`
        );

        

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error! User couldn't be registered"
        })
        
    }
}

export const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;

        const existUser = await User.findOne({email:email});

        if(!existUser){
            return res.status(404).json({message:"User with given email not found"});
        }

        const match = await bcrypt.compare(password, existUser.password);

        if(!match){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = await jwt.sign({id:existUser._id,name:existUser.name},process.env.SECRET_KEY);

        res.status(200).json({
            success:true,
            message:"Login successful",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
};