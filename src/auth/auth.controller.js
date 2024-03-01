import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { mail, password } = req.body;

    try {
        //verificar si el email existe:
        const user = await User.findOne({ mail });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email does not exist in the database",
            });
        }
        //verificar si el ususario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: "The user does not exist in the database",
            });
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        //generar el JWT
        const token = await generarJWT(user.id);

        const userData = {
            username: user.username,
            mail: user.mail,
        };

        res.status(200).json({
            msg: 'Login Ok!!!',
            user: userData,
            token
        });


    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}