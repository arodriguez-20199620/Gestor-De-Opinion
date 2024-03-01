import Publications from './publications.model.js';
import mongoose from 'mongoose';

const publicationPost = async (req, res) => {
    const userId = req.user._id;
    const { title, category, text } = req.body;

    try {

        const publication = new Publications({
            title, category, text, author_id: new mongoose.Types.ObjectId(userId),

        });

        await publication.save();

        res.status(201).json({
            publication
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

const publicationPut = async (req, res) => {
    const { id } = req.params;
    const { _id, author_id, ...rest } = req.body;

    try {
        await Publications.findByIdAndUpdate(id, rest)

        const publication = await Publications.findOne({ _id: id })

        res.status(200).json({
            publication
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

export { publicationPost, publicationPut};
