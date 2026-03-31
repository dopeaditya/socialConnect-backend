import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
        
    },
    profileImage:{
        type:String
    },
    bio:{
        type:String
    },
    followers:[
        {
            followerId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    following:[
        {
            followed:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ]

},
{timestamps:true}
);

const User = mongoose.model('User',userSchema);
export default User;