import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "badge-service",
    brokers: ['localhost:9092']
})

export default kafka