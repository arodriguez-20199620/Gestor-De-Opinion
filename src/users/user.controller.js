import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

const userPost = async (req, res) => {

    const { username, mail, password, firstname, lastname } = req.body;
    const user = new User({ username, mail, password, firstname, lastname });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar datos
    await user.save();
    console.log("Se registro su usuario correctamente");

    res.status(201).json({
        user
    });


}


const userPut = async (req, res) => {
    try {
        const userId = req.user._id;
        const { _id, password: newPassword, ...userUpdate } = req.body;
        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            userUpdate.password = bcryptjs.hashSync(newPassword, salt);
        }
        
        await User.findByIdAndUpdate(userId, userUpdate);

        const user = await User.findOne({ _id: userId });

        const userData = {
            username: user.username,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname
        };

        res.status(200).json({
            msg: 'Actualizado exitosamente',
            user: userData
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error' });
    }
};

export { userPost, userPut };
