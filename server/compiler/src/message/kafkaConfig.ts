import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "compiler-service",
    brokers: ['kafka-service:9092']
})

export default kafka