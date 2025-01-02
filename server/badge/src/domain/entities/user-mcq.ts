export interface IUserMcq {
    name: string;
    email: string;
    badges: string[];
    testAttended: number;
    questionAttended: number;
    wrongAnswers: number;
    rightAnswers: number;
    points: number;
}