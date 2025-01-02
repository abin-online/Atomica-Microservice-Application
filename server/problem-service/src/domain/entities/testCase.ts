export interface ITestCase  {
    problemId: string;
    id: string;
    input: object;
    expectedOutput: any;
    orderMatters: boolean;
    visibility: 'public' | 'hidden';
  }
  