import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "problem-service",
    brokers: ['kafka-service:9092'],
    connectionTimeout: 5000,
    retry: {
        retries: 10
    }
})

export default kafka