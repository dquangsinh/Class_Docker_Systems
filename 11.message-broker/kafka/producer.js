require('dotenv').config();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [`localhost:${process.env.KAFKA_PORT}`],
});

const TOPIC = process.env.TOPIC_NAME || 'demo-topic';

(async () => {
  const producer = kafka.producer();
  await producer.connect();

  for (let i = 1; i <= 5; i++) {
    const msg = { id: i, text: `Event #${i} @ ${new Date().toISOString()}` };
    await producer.send({
      topic: TOPIC,
      messages: [{ key: String(i), value: JSON.stringify(msg) }],
    });
    console.log('→ sent:', msg);
  }

  await producer.disconnect();
})().catch(err => { console.error(err); process.exit(1); });
