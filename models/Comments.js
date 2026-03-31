import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    usedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    commentText:{
        type:String,
    }

},
{timestamps:true}
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;