import { CompilerController } from "../controller/compilerController";
import { TestCaseController } from "../controller/testCaseController";

const compilerController = new CompilerController();

const testCaseController = new TestCaseController()

export {
    compilerController,
    testCaseController
}