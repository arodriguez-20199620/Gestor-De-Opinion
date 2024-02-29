import { Router } from "express";
import { check } from "express-validator";
import { userPost, userPut } from "./user.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.use(validarCampos);

router.put('/', validarJWT, userPut);

router.post(
    "/",
    [
        check("username", "Ingrese un nombre de usuario").not().isEmpty(),
        check("mail", "Este no es un correo válido").isEmail(),
        check("password", "La contraseña debe ser mayor a 6 caracteres").isLength({
            min: 6,
        }),
        check("firstname", "Ingrese su nombre"),
        check("lastname", "Ingrese su apellidoF"),
        validarCampos,
    ], userPost);

export default router;
