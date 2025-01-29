export interface IProblem  {
    id: string;
    title: string;
    blocked: boolean
    description: string;
    difficulty: 'Beginner' | 'Intermmediate' | 'Advanced';
    tags: string[];
    inputFormat: { name: string; type: string; description: string }[];
    outputFormat: { type: string; description: string };
    constraints: string[];
    functionName: string;
    hints: string[];
  }
  