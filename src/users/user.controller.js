import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

const usuariosPost = async (req, res) => {
    const { username, mail, password, firstname, lastname } = req.body;
    const user = new User({ username, mail, password, firstname, lastname });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar datos
    await user.save();

    res.status(200).json({
        user
    });
}

export { usuariosPost };
