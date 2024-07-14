import express from "express";
import articleRouter from "./article.router";
import categoryRouter from "./category.router";
import authorRouter from "./author.router";

const indexRouter = express.Router()

indexRouter.use('/article', articleRouter)
indexRouter.use('/category', categoryRouter)
indexRouter.use('/author', authorRouter)



export default indexRouter;