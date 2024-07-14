import express from "express";
import { CreateArticle, DeleteAticle, GetArticleById, GetArticles, UpdateArticle } from "../controllers/article.controller";

const articleRouter = express.Router()

articleRouter.get('/', GetArticles)
articleRouter.get('/:id', GetArticleById)
articleRouter.post('/', CreateArticle)
articleRouter.put('/', UpdateArticle)
articleRouter.delete('/', DeleteAticle)





export default articleRouter;