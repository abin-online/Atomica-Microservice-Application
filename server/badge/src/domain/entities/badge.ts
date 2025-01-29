export interface IBadge {
    _id?: string;
    name: string;
    description: string;
    minQuestionsSolved: number;
    category: "problem" | "test";
    imageURL: string;
    isActive?: boolean;
}  
