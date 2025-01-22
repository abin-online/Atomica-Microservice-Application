import kafka from "./kafkaConfig";
import { mcqUserService, userProblemService } from "../../routes/injection";

async function consume() {

    try {
        const consumer = kafka.consumer({ groupId: "badge-service" });
        console.log('daaaaaaaaa')
        await consumer.connect();
        await consumer.subscribe({
            topics: ["add-user"],
            fromBeginning: true,
        });
        
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let data
                if (message.value) {
                    data = JSON.parse(message.value.toString())
                }

                if (topic === "add-user") {
                    console.log('user ulle vandhitte')

                    // await tagService.addTag(tag)
                    console.log(data)
                    
                    await Promise.all([
                        mcqUserService.createUser(data),
                        userProblemService.createUser(data)
                    ])
                 
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}
export default consume;
