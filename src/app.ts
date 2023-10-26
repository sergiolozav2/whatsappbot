import fastify from "fastify";
import { account_sid } from "./constants/env";
import { sendWhatsappText } from "./controllers/whatsapp";

const server = fastify();



server.get("/", async (request, reply) => {
  return { hello: "serta" };
});


server.post("/webhook", async (request, reply) => {

  console.log(request);
})


server.listen({port: 8000}, (err, address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Server listening ${address}`)
})


