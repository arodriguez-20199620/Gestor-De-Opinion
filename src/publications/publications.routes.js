import { Router } from "express";
import { check } from "express-validator";

// middlewares & helpers
import { validateFields, validateAuthor } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost } from "../helpers/publications-validations.js";

// controlador
import { publicationPost, publicationPut } from "./publications.controller.js";


const router = Router();

router.post('/',
    validarJWT,
    [
        check("title", "Campo obligatorio").not().isEmpty(),
        check("category"),
        check("text"),
        validateFields,
    ], publicationPost);

router.put('/:id', validarJWT,
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthor,
    ], publicationPut);

export default router;
