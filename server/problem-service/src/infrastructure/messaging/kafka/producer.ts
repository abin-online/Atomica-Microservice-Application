import kafka from "./kafkaConfig";
import { Partitioners } from "kafkajs";

async function produce(topic: string, value: any | Buffer): Promise<void> {
    console.log(topic, "__________________", value)
    try {
        const producer = kafka.producer({createPartitioner : Partitioners.LegacyPartitioner}) 
        //LegacyPartitioner, which decides how messages are partitioned across Kafka's topics.
        console.log("Connecting to Kafka producer...");
        await producer.connect();
        console.log("Producer connected successfully.");
        const messageValue = typeof value === "object" ? JSON.stringify(value) : value;

        console.log(`Sending message to topic: ${topic} => ${messageValue}`);
        await producer.send({
            topic,
            messages: [{ value: messageValue }],
        });
        
        console.log("Message sent successfully.");

        await producer.disconnect();
        console.log("Producer disconnected.");
    } catch (error) {
        console.log(error);
    }
}

export default produce