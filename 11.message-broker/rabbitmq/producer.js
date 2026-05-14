require('dotenv').config();
const amqp = require('amqplib');

const URL = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@localhost:${process.env.RABBITMQ_PORT}`;
const QUEUE = process.env.QUEUE_NAME || 'task_queue';

(async () => {
  const conn = await amqp.connect(URL);
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });

  for (let i = 1; i <= 5; i++) {
    const msg = JSON.stringify({ id: i, text: `Hello #${i} @ ${new Date().toISOString()}` });
    ch.sendToQueue(QUEUE, Buffer.from(msg), { persistent: true });
    console.log('→ sent:', msg);
  }

  await ch.close();
  await conn.close();
})().catch(err => { console.error(err); process.exit(1); });
