// export interface ITagUseCase {
//     addTag(data: any): Promise<any>;
//     blockTag(data: any) : Promise<any>
// }

export interface ITestCaseUseCase {
    addTestCase(data: any) : Promise<any>;
    getTestCase(id: string) : Promise <any>;
    updateTestCase(id: string, data: any) : Promise<any>
    getTestCases(): Promise<any>
}
  