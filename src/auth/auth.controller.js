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
                msg: "Credenciales incorrectas, Correo no existe en la base de datos",
            });
        }
        //verificar si el ususario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos",
            });
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta",
            });
        }
        //generar el JWT
        const token = await generarJWT(user.id);
        res.status(200).send({
            msg: 'Login Ok!!!',
            user,
            token
        });


    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador",
        });
    }
}