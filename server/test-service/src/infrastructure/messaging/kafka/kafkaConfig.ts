import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "test-service",
    brokers: ['localhost:9092'],
});

export default kafka;