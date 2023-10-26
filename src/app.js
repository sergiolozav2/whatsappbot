"use strict";

import fetch from "node-fetch";
import { chatgpt } from "./services/chatgpt.js";
import * as fastify from "fastify";
import {
  setWebhook,
  objectFromWebhookResponse,
  sendWhatsappText,
  MessageTypes,
} from "./services/whatsapp.js";
import {
  getUserByPhone,
  updateUserConversationStep,
} from "./repository/users.js";
import { steps } from "./services/conversation_flow.js";

const server = fastify.fastify();

server.get("/", async (request, reply) => {
  return { hello: "serta" };
});

server.post("/webhook", async (request, reply) => {
  const message = objectFromWebhookResponse(request.body);
  console.log(message);
  if (message.type !== MessageTypes.text) {
    return { sucess: "false" };
  }
  const user = await getUserByPhone(message.from);

  if (!user) {
    console.log("Usuario no registrado intento notificarme");
    return;
  }

  let nextStep = "";
  const step = user.conversation_step;
  console.log(user)
  switch (step) {
    case "nuevo":
      await sendWhatsappText(
        user.phone,
        "Bienvenido a CaimanTec 🐊, soy una IA asistente. ¿Qué deseas hacer? \n1. Información \n2. Comprar \n3. Soporte"
      );
      nextStep = "inicio";
      break;

    case "inicio":
      const options = steps[step].nextStep;
      nextStep = options[Number.parseInt(message.text) - 1];
      await sendWhatsappText(user.phone, `Haz seleccionado ${nextStep}`);
      break;
    default:
      // Para hacer pruebas si sé sale del rango lo voy a reiniciar
      nextStep = "nuevo";
      await sendWhatsappText(
        user.phone,
        `Hasta aquí llego la AI 🐊, reiniciando!`
      );
      break;
  }

  const updatedUser = await updateUserConversationStep(user.phone, nextStep);
  console.log(updatedUser);

  return { success: "true" };
});

server.post("/chatgpt", async (request, reply) => {
  const query = request.query.prompt;
  const res = await chatgpt.sendMessage(query);
  return { text: res };
});

server.listen({ host: "0.0.0.0", port: 3000 }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening ${address}`);
});
