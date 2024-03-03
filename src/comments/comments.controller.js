import Comment from './comments.model.js';
import Posts from '../posts/posts.model.js';
import User from '../users/user.model.js';

const createComment = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;
    const { text } = req.body;

    try {

        const post = await Posts.findOne({ _id: postId });

        const comment = new Comment({
            postId, text, author_id: userId,
        });

        await comment.save();


        const postAuthor = await User.findOne({ _id: post.author_id });
        const commentAuthor = await User.findOne({ _id: comment.author_id });

        const data = {
            post: {
                title: post.title,
                category: post.category,
                text: post.text,
                creation_date: post.creation_date,
                author: postAuthor.username,
            },
            comment: {
                comment: comment.text,
                author: commentAuthor.username,
            }

        };

        res.status(201).json({
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

export { createComment }