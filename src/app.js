import { account_sid } from "./constants/env.js";
import { sendWhatsappText } from "./services/whatsapp.js";
import { chatgpt } from "./services/chatgpt.js";
import * as fastify from "fastify";

const server = fastify.fastify()

server.get("/", async (request, reply) => {
  return { hello: "serta" };
});


server.post("/webhook", async (request, reply) => {
  console.log(request);
})


server.post("/chatgpt", async (request, reply) => {
  const query = request.query.prompt
  const res = await chatgpt.sendMessage(query);
  return { text: res.text }
})

server.listen({port: 8000}, (err, address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Server listening ${address}`)
})


