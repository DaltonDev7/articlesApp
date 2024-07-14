import express from "express";
import { CreateCategory, DeleteCategory, GetById, GetCategories, UpdateCategory } from "../controllers/category.controller";


const categoryRouter = express.Router()


categoryRouter.get('/', GetCategories)
categoryRouter.get('/:id', GetById)
categoryRouter.post('/', CreateCategory)
categoryRouter.put('/', UpdateCategory)
categoryRouter.delete('/:id', DeleteCategory)

export default categoryRouter;