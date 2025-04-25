import express from 'express';
import Comments from '../model/Comments.js';
import Videos from '../model/Videos.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router({ mergeParams: true });
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Videos.findById(id).populate({ path: 'comments', populate: { path: 'userId' } });
        console.log(video);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        const comments = video.comments.map(comment => ({
            _id: comment._id,
            text: comment.text,
            userId: comment.userId,
            createdAt: comment.createdAt,
        }));
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching comments' });
    }
});

router.post('/:id', isLogin, async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const newComment = new Comments({
            userId: req.user._id,
            text,
        });
        const video = await Videos.findById(id);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        video.comments.push(newComment._id);
        await video.save();
        console.log("newComment Added");
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding comment' });
    }
});

export default router;