import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Youtube');
    console.log("Connection is up");
}

const VideoSchema = new Schema({
    title: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    description: { type: String, required: true },
    channelId: { type: String, required: true },
    uploader: { type: Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    uploadDate: { type: Date,
        required: true,
        default:Date.now,
     },
    comments:{
        type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        default: [],
    }
});

const Videos = mongoose.model("video", VideoSchema);

export default Videos;