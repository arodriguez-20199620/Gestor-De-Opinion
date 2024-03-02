import Posts from './posts.model.js';
import mongoose from 'mongoose';
import Users from '../users/user.model.js'

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

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Posts.findByIdAndUpdate(id, { state: false });

        const posts = await Posts.findOne({ _id: id });

        res.status(200).json({
            msg: 'Post was successfully deleted',
            posts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }


}

const feedPost = async (req, res) => {
    const { limit, offset } = req.query;
    const query = { state: true };

    try {
        const [total, posts] = await Promise.all([
            Posts.countDocuments(query),
            Posts.find(query)
                .skip(Number(offset))
                .limit(Number(limit))
                .populate('author_id', 'username')
        ]);

        const formattedPosts = posts.map(post => ({
            _id: post._id,
            title: post.title,
            category: post.category,
            text: post.text,
            username: post.author_id.username,
            creation_date: new Date(post.creation_date).toISOString().split('T')[0],
        }));

        res.status(200).json({
            total,
            posts: formattedPosts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los posts.' });
    }
};



export { createPosts, updatePosts, deletePost, feedPost, userPosts };
