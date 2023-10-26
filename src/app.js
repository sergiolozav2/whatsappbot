import fetch from 'node-fetch';
import { chatgpt } from "./services/chatgpt.js";
import * as fastify from "fastify";
import { setWebhook } from './services/whatsapp.js';

const server = fastify.fastify()

server.get("/", async (request, reply) => {
  return { hello: "serta" };
});


server.post("/webhook", async (request, reply) => {
  console.log(request.body);
  console.log(request.headers)
  console.log(request.query);z

  return { mensage: JSON.stringify(request) }
})


server.post("/chatgpt", async (request, reply) => {
  const query = request.query.prompt
  const res = await chatgpt.sendMessage(query);
  return { text: res }
})

server.listen({host:"0.0.0.0", port: 3000}, (err, address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Server listening ${address}`)
})


