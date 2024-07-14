import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import { getErrorMessage } from "../core/helpers/error-message";
import { ApiResponse } from "../core/models/api-response";


const prisma = new PrismaClient()


export const GetAuthors = async (req: Request, res: Response) => {

    try {
        const authors = await prisma.author.findMany();
        res.json(new ApiResponse(authors))
    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const GetAuthorById = async (req: Request, res: Response) => {
    try {

         const author = await prisma.author.findFirst({ where :{
            id: parseInt(req.params.id)
         }});

         if(!author)
            return res.status(404).json(new ApiResponse('item not found'))

         return res.json(author)

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const DeleteAuthor = async (req: Request, res: Response) => {
    try {

        const author = await prisma.author.findFirst({ where :{
            id: parseInt(req.params.id)
         }});

         if(!author)
            return res.status(404).json(new ApiResponse('item not found'))

         await prisma.author.delete({ where :{
            id: parseInt(req.params.id)
         }});

         res.json(new ApiResponse({message: 'item deleted'}))
         
    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const CreateAuthor = async (req: Request, res: Response) => {
    try {

        await prisma.author.create({ data: req.body })
        res.json(new ApiResponse({message: 'item created'}))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}


export const UpdateAuthor= async (req: Request, res: Response) => {
    try {

        const author = await prisma.author.findFirst({ where :{
            id: parseInt(req.body.id)
         }});

        if(!author)
            return res.status(404).json(new ApiResponse('item not found'))

         await prisma.author.update({
            where: {
                id : parseInt(req.body.id)
            },
            data: req.body
        })
        
        return res.json(new ApiResponse({message: 'item updated'}))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}
