require('dotenv').config();
const amqp = require('amqplib');

const URL = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@localhost:${process.env.RABBITMQ_PORT}`;
const QUEUE = process.env.QUEUE_NAME || 'task_queue';

(async () => {
  const conn = await amqp.connect(URL);
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });
  ch.prefetch(1);

  console.log(`⏳ waiting for messages on "${QUEUE}". Ctrl+C to exit.`);
  ch.consume(QUEUE, (msg) => {
    if (!msg) return;
    console.log('← received:', msg.content.toString());
    ch.ack(msg);
  });
})().catch(err => { console.error(err); process.exit(1); });
