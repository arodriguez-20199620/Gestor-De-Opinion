import User from '../users/user.model.js'
import zxcvbn from 'zxcvbn';

const emailExists = async (mail = '') => {
    try {
        const emailExists = await User.findOne({ mail });
        if (emailExists) {
            throw new Error(`Correo electrónico "${mail}" ya registrado. Elija otro.`);
        }
    } catch (error) {
        throw error;
    }
}

const userNameExists = async (username = '') => {
    try {
        const userNameExists = await User.findOne({ username });
        if (userNameExists) {
            throw new Error(`El nombre de usuario ${username} no está disponible`);
        }
    } catch (error) {
        throw error;
    }
}

const validatePassword = async (password = '') => {
    const result = zxcvbn(password);

    if (result.score < 2) {
        throw new Error(`La contraseña no es lo suficientemente fuerte. Sugerencias: ${result.feedback.suggestions.join(', ')}`);
    }
    if (password.length < 6 ) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }
};

export { emailExists, userNameExists, validatePassword };
