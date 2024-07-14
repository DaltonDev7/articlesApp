import { Article } from "@prisma/client";
import { IBaseRepository } from "./IBaseRepository";

export interface IArticleRepository extends IBaseRepository<Article> {

}