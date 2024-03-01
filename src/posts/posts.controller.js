import Posts from './posts.model.js';
import mongoose from 'mongoose';

const createPosts = async (req, res) => {
    const userId = req.user._id;
    const { title, category, text } = req.body;

    try {

        const posts = new Posts({
            title, category, text, author_id: new mongoose.Types.ObjectId(userId),

        });

        await posts.save();

        res.status(201).json({
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

const updatePosts = async (req, res) => {
    const { id } = req.params;
    const { _id, author_id, ...rest } = req.body;

    try {
        await Posts.findByIdAndUpdate(id, rest)

        const posts = await Posts.findOne({ _id: id })

        res.status(200).json({
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};



export { createPosts, updatePosts };
