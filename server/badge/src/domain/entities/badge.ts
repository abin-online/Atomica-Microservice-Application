export interface IBadge {
    _id?: string;
    name: string;
    description: string;
    minQuestionsSolved: number;
    imageURL: string;
    isActive?: boolean;
}  
