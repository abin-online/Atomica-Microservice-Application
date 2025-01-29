export interface CompletedProblem {
  problem: string;
  submissionDate: Date;
}

export interface Streak {
  current: number; // Current streak count
  highest: number; // Highest streak achieved
  lastUpdated?: Date; // Last date when streak was updated
}


export interface UserProblem {
  name: string;
  email: string;
  badges?: string[];
  attempted?: number;
  solved?: number;
  points?: number;
  completed?: CompletedProblem[];  
  streak?: Streak;
  createdAt?: Date;
  updatedAt?: Date;
}
