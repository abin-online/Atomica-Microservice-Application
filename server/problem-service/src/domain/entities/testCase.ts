export interface ITestCase {
  problem: string;
  _id?: string;
  input: { params: string }[];  
  expectedOutput: any;  
  visibility: 'public' | 'hidden';  
}
