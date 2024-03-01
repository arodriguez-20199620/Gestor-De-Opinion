import { validationResult } from "express-validator";
import Posts from "../posts/posts.model.js";

const validateFields = (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }
    } catch (error) {
        throw error
    }

    next();
}

const validateAuthor = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const existingPost = await Posts.findById(postId);

        if (!existingPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (existingPost.author_id.toString() !== userId) {
            return res.status(403).json({ error: 'You are not the author of this post' });
        }

        req.post = existingPost;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { validateFields, validateAuthor }