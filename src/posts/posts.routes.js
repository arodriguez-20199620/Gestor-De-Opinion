import { Router } from "express";
import { check } from "express-validator";

// middlewares & helpers
import { validateFields, validateAuthor } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost } from "../helpers/posts-validations.js";
import { existUserById } from "../helpers/user-validations.js"

// controlador
import { createPosts, updatePosts, deletePost, feedPost, userPosts } from "./posts.controller.js";


const router = Router();

router.get('/', feedPost);


router.post('/',
    validarJWT,
    [
        check("title", "Obligatory field").not().isEmpty(),
        check("category"),
        check("text"),
        validateFields,
    ], createPosts);

router.put('/:id', validarJWT,
    [
        check("id", "The id is not a valid MongoDB format").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthor,
    ], updatePosts);


router.delete('/:id', validarJWT,
    [
        check("id", "The id is not a valid MongoDB format").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthor,
    ], deletePost);

export default router;
