import kafka from './kafkaConfig';
import { tagService } from '../../routes/injection';

async function consume() {

    try {
        const consumer = kafka.consumer({ groupId: "problem-service" });
        console.log('daaaaaaaaa')
        await consumer.connect();
        await consumer.subscribe({
            topics: ["add-tag", 'block-tag'],
            fromBeginning: true,
        });
        
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let tag
                if (message.value) {
                    tag = JSON.parse(message.value.toString())
                }

                if (topic === "add-tag") {
                    console.log('tagukk ulle vandhitte')

                    await tagService.addTag(tag)
                }else if(topic === 'block-tag') {
                    console.log('blog tagukk ulle vandhitte' , tag)
        
                    await tagService.blockTag(tag)
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}
export default consume;
