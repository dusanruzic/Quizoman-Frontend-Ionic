import { ICategory } from './category';

export interface IQuestion{

    url: string,
    name: string,
    answer: string,
    hint: string,
    category: ICategory
}