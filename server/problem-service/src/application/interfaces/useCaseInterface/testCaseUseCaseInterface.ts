
export interface ITestCaseUseCase {
    addTestCase(data: any) : Promise<any>;
    getTestCase(id: string) : Promise <any>;
    updateTestCase(id: string, data: any) : Promise<any>
    getTestCases(): Promise<any>
    publicTestCases(problem: string) : Promise<any>
}
  