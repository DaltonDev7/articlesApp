import express from "express";
import { CreateAuthor, DeleteAuthor, GetAuthorById, GetAuthors, UpdateAuthor } from "../controllers/author.controller";



const authorRouter = express.Router()


authorRouter.get('/', GetAuthors)
authorRouter.get('/:id', GetAuthorById)
authorRouter.post('/', CreateAuthor)
authorRouter.put('/', UpdateAuthor)
authorRouter.delete('/:id', DeleteAuthor)

export default authorRouter;