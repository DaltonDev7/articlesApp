import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express';
import { ApiResponse } from "../core/models/api-response";
import { getErrorMessage } from "../core/helpers/error-message";


const prisma = new PrismaClient()

export const GetArticles = async (req: Request, res: Response) => {
    try {
        const articles = await prisma.article.findMany({ orderBy: { createAt: 'desc' } });

        let articleMapper = await Promise.all(articles.map(async (article) => {

            return {
                ...article,
                authorName: await getAuthor(article),
                categoryName: await getCategory(article)
            }

        }))

        res.json(new ApiResponse(articleMapper))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

const getAuthor = async (article: any) => {
    let authorName = await prisma.author.findFirst({ where: { id: article.idAuthor }, select: { name: true } })
    console.log(`Author for article ${article.id}:`, authorName?.name);
    return authorName?.name
}

const getCategory = async (article: any) => {

    let category = await prisma.category.findFirst({ where: { id: article.idCategory }, select: { name: true } })
    console.log(`getCategory for article ${article.id}:`, category?.name);
    return category?.name;
}

export const GetArticleById = async (req: Request, res: Response) => {
    try {

        const article = await prisma.article.findFirst({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!article)
            return res.status(404).json(new ApiResponse('item not found'))

        return res.json(article)

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const DeleteAticle = async (req: Request, res: Response) => {
    try {

        const article = await prisma.article.findFirst({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!article)
            return res.status(404).json(new ApiResponse('item not found'))

        await prisma.article.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });

        res.json(new ApiResponse({ message: 'item deleted' }))


    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const CreateArticle = async (req: Request, res: Response) => {
    try {

        await prisma.article.create({ data: req.body })
        res.json(new ApiResponse({ message: 'item created' }))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}


export const UpdateArticle = async (req: Request, res: Response) => {
    try {

        const article = await prisma.article.findFirst({
            where: {
                id: parseInt(req.body.id)
            }
        });

        if (!article)
            return res.status(404).json(new ApiResponse('item not found'))

        let articleUpdate = await prisma.article.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        })
        return res.json(new ApiResponse(articleUpdate))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}
