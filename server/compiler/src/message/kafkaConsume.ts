import { testCaseController } from "../routes/injection";
import kafka from "./kafkaConfig";


async function consume() {

    try {
        const consumer = kafka.consumer({ groupId: "compiler-service" });
        console.log('compiler service consumed for adding new Test Case');
        await consumer.connect();
        await consumer.subscribe({
            topics: ["add-testCase"],
            fromBeginning: true,
        });
        
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let data
                console.log('________________', data)
                if (message.value) {
                    data = JSON.parse(message.value.toString())
                }
            
                if (topic === "add-testCase") {
                    await testCaseController.addTestcase(data)
                    // await tagService.addTag(tag)
                    console.log(data)
                    //await mcqUserService.createUser(data)
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}
export default consume;
