import Publication from '../publications/publications.model.js'

const existingPost = async (id = '') => {
    try {
        const existingPost = await Publication.findById(id);
        if (!existingPost) {
            throw new Error(`Publicación no encontrada`);
        }
    } catch (error) {
        throw error;
    }
}

export { existingPost };
