import { Router } from "express";
import { check } from "express-validator";

// middlewares & helpers
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

// controlador
import { publicationPost } from "./publications.controller.js";


const router = Router();

router.post('/',
    validarJWT,
    [
        check("title","Campo obligatorio").not().isEmpty(),
        check("category"),
        check("text"),
        validarCampos,
    ], publicationPost);

export default router;
