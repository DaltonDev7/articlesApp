import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express';
import { ApiResponse } from "../core/models/api-response";
import { getErrorMessage } from "../core/helpers/error-message";


const prisma = new PrismaClient()

export const GetArticles = async (req: Request, res: Response) => {
    try {
        const articles = await prisma.article.findMany();
        res.json(new ApiResponse(articles))


    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}




export const GetArticleById = async (req: Request, res: Response) => {
    try {

         const article = await prisma.article.findFirst({ where :{
            id: parseInt(req.params.id)
         }});

         if(!article)
            return res.status(404).json(new ApiResponse('item not found'))

         return res.json(article)

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const DeleteAticle = async (req: Request, res: Response) => {
    try {

        const article = await prisma.article.findFirst({ where :{
            id: parseInt(req.params.id)
         }});

         if(!article)
            return res.status(404).json(new ApiResponse('item not found'))

         await prisma.article.delete({ where :{
            id: parseInt(req.params.id)
         }});

         res.json(new ApiResponse({message: 'item deleted'}))

         
    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const CreateArticle = async (req: Request, res: Response) => {
    try {

        await prisma.article.create({ data: req.body })
        res.json(new ApiResponse({message: 'item created'}))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}


export const UpdateArticle = async (req: Request, res: Response) => {
    try {

        const article = await prisma.article.findFirst({ where :{
            id: parseInt(req.body.id)
         }});

        if(!article)
            return res.status(404).json(new ApiResponse('item not found'))

        let articleUpdate = await prisma.article.update({
            where: {
                id : parseInt(req.body.id)
            },
            data: req.body
        })
        return res.json(new ApiResponse(articleUpdate))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}
