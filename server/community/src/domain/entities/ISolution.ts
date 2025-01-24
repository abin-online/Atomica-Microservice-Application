import { IComment } from "./IComment";

export interface ISolution {
    author: string;
    email: string;
    problem: string;
    code: string;
    notes?: string;
    language: string;
    upvotes: string[];
    comments: IComment[]
    createdAt: Date;
}