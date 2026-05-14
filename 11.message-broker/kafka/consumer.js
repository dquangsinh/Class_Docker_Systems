require('dotenv').config();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [`localhost:${process.env.KAFKA_PORT}`],
});

const TOPIC = process.env.TOPIC_NAME || 'demo-topic';
const GROUP = process.env.GROUP_ID || 'demo-group';

(async () => {
  const consumer = kafka.consumer({ groupId: GROUP });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  console.log(`⏳ consuming "${TOPIC}" as group "${GROUP}". Ctrl+C to exit.`);
  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log(`← [p${partition}] key=${message.key} value=${message.value.toString()}`);
    },
  });
})().catch(err => { console.error(err); process.exit(1); });
