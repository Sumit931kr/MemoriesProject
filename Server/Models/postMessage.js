import mongoose from "mongoose";

const PostSchema  = mongoose.Schema({
    title : String,
    message : String,
    name:String,
    creator : String,
    tag : [String],
    selectedFile : String,
    likes : {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date,
        default : new Date()
    },

})

const PostMessage = mongoose.model('PostMessage' , PostSchema )

export default PostMessage;