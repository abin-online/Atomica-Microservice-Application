import kafka from "./kafkaConfig";
import { Partitioners } from "kafkajs";

async function produce(topic: string, value: string | Buffer): Promise<void> {
    try {
        const producer = kafka.producer({createPartitioner : Partitioners.LegacyPartitioner}) 
        //LegacyPartitioner, which decides how messages are partitioned across Kafka's topics.
        console.log("Connecting to Kafka producer...");
        await producer.connect();
        console.log("Producer connected successfully.");

        console.log(`Sending message to topic: ${topic} => ${value}`); 
        await producer.send({
            topic,
            messages: [{ value }],
        });
        console.log("Message sent successfully.");

        await producer.disconnect();
        console.log("Producer disconnected.");
    } catch (error) {
        console.log(error);
    }
}

export default produce