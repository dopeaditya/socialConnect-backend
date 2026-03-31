import Post from "../models/Post.js";

export const createPost = async(req,res)=>{
    try {
        const {caption, location} = req.body;
        const media = req.files.map((file)=>{
            return{
                mediaType: file.mimetype.startsWith("image") ? "image":"video",
                mediaUrl:file.path
            }

        })


        const userId = req.user.id

        const post = await Post.create({
                                        userId,
                                        caption,
                                        location,
                                        media
        })

        res.status(201).json({
            success:true,
            message:"Post created successfully",
            data:post
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Couldn't create post"
        })
        
    }
}