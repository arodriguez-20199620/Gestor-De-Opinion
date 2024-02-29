import { Router } from "express";
import { check } from "express-validator";

// middlewares & helpers
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { emailExists, userNameExists, validatePassword } from "../helpers/user-validations.js";
// Controladores
import { userPost, userPut } from "./user.controller.js";


const router = Router();

router.use(validarCampos);

router.put('/', validarJWT,
    [
        check("username", "Ingrese un nombre de usuario").not().isEmpty(),
        check("username").custom(userNameExists),
        check("password").custom(validatePassword),
        check("firstname", "Ingrese su nombre").not().isEmpty(),
        check("lastname", "Ingrese su apellido").not().isEmpty(),
        validarCampos,
    ], userPut);

router.post(
    "/",
    [
        check("username", "Ingrese un nombre de usuario").not().isEmpty(),
        check("username").custom(userNameExists),
        check("mail", "Este no es un correo válido").isEmail(),
        check("mail").custom(emailExists),
        check("password").custom(validatePassword),
        check("firstname", "Ingrese su nombre").not().isEmpty(),
        check("lastname", "Ingrese su apellido").not().isEmpty(),
        validarCampos,
    ], userPost);

export default router;
