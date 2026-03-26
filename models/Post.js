import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String,

    },
    caption:{
        type:String
    }
},
 {timestamps:true}
);

const Post = mongoose.model('Post', postSchema);
export default Post;
