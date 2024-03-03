import { Router } from "express";
import { check } from "express-validator";

// validaciones
import { existUserById } from "../helpers/user-validations.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { existingPost } from "../helpers/posts-validations.js";

// controlador
import { createComment } from "./comments.controller.js";

const router = Router();


router.post('/:postId',
    validarJWT,
    [
        check("postId", "The id is not a valid MongoDB format").isMongoId(),
        check("postId").custom(existingPost),
        check("text", "Obligatory field").not().isEmpty(),
        validateFields,
    ], createComment);

export default router;
