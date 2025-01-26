import { ICandidate } from "./IResult";

export interface IContest {
    contestName: string;
    selectedProblems: string[];
    selectedMCQs: string[];
    points: number;
    duration: number;
    candidate?: ICandidate[]
    expiryDate: string;
}