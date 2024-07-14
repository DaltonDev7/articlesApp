import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express';
import { ApiResponse } from "../core/models/api-response";
import { getErrorMessage } from "../core/helpers/error-message";

const prisma = new PrismaClient()


export const GetCategories = async (req: Request, res: Response) => {

    try {
        const categories = await prisma.category.findMany();
        res.json(new ApiResponse(categories))
    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const GetById = async (req: Request, res: Response) => {
    try {

         const category = await prisma.category.findFirst({ where :{
            id: parseInt(req.params.id)
         }});

         if(!category)
            return res.status(404).json(getErrorMessage('Item not found'))

         return res.json(new ApiResponse(category))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const DeleteCategory = async (req: Request, res: Response) => {
    try {

        const category = await prisma.category.findFirst({ where :{
            id: parseInt(req.params.id)
         }});

         if(!category)
            return res.status(404).json(getErrorMessage('Item not found'))

         await prisma.category.delete({ where :{
            id: parseInt(req.params.id)
         }});

         return res.json(new ApiResponse({message: 'item deleted'}))
         
    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}

export const CreateCategory = async (req: Request, res: Response) => {
    try {

        console.log(req.body);

        await prisma.category.create({ data: req.body })
        res.json(new ApiResponse({message: 'item created'}))

    } catch (error) {
        res.json(getErrorMessage('An error has ocurred', error))
    }
}


export const UpdateCategory = async (req: Request, res: Response) => {
    try {

        const category = await prisma.category.findFirst({ where :{
            id: parseInt(req.body.id)
         }});

        if(!category)
            return res.status(404).json(new ApiResponse({error: 'item not found'}))

         await prisma.category.update({
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
