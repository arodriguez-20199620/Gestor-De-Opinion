import Publications from './publications.model.js';
import mongoose from 'mongoose';

const publicationPost = async (req, res) => {
    const userId = req.user._id;
    const { title, category, text } = req.body;

    try {
        // Crea una nueva instancia de ObjectId usando 'new'
        const autorId = new mongoose.Types.ObjectId(userId);

        // Crea una nueva instancia de Publicacion
        const publication = new Publications({ title, category, text, autor_id: autorId });

        // Guarda la publicación en la base de datos
        await publication.save();

        res.status(201).json({
            publication
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}

export { publicationPost };
