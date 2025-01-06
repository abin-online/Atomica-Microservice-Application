export interface ITestCase  {
    problem: string;
    _id?: string;
    input: object;
    expectedOutput: any;
    visibility: 'public' | 'hidden';
  }
  