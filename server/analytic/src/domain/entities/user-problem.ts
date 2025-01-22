export interface CompletedProblem {
  problem: string;
  submissionDate: Date;
}

export interface UserProblem {
  name: string;
  email: string;
  badges?: string[];
  attempted?: number;
  solved?: number;
  points?: number;
  completed?: CompletedProblem[];  
  createdAt?: Date;
  updatedAt?: Date;
}
