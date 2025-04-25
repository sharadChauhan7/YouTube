import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User',},
    text:{ type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Comments = mongoose.model("Comment", CommentSchema);
export default Comments;