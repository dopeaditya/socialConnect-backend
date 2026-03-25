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


        await sendEmail(
  email,
  "Welcome to SocialConnect 🎉",
  `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">

        await sendEmail(email,"Welcome to our website",
            <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">

    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color: #4e944f; text-align: center;">Welcome to SocialConnect 🚀</h2>
      
      <p style="font-size: 16px; color: #333;">
        Hi <strong>${username}</strong>,
      </p>
      
      <p style="font-size: 15px; color: #555;">
        We're excited to have you onboard! 🎉  
        SocialConnect helps you connect, share, and grow your network effortlessly.
      </p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="#" 
           style="background-color: #4e944f; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Get Started
        </a>
      </div>
      
      <p style="font-size: 14px; color: #777;">
        If you have any questions, feel free to reply to this email. We're here to help!
      </p>
      
      <hr style="margin: 20px 0;" />
      
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © 2026 SocialConnect. All rights reserved.
      </p>
    
    </div>
  

  </div>
  

  </div>`
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