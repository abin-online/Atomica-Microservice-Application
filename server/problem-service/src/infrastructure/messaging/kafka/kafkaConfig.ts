import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "problem-service",
    brokers: ['localhost:9092']
})

export default kafka