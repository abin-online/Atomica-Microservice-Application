export interface IComment {
    author: string;
    text: string;
    createdAt?: Date;
    replies: IComment[]
}

