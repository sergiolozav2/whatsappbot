"use strict";

import * as fastify from "fastify";
import {
  setWebhook,
  objectFromWebhookResponse,
  sendWhatsappText,
  MessageTypes,
  sendWhatsappQR,
} from "./services/whatsapp.js";
import {
  getUserByPhone,
  updateUserConversationStep,
} from "./repository/users.js";
import { steps } from "./services/conversation_flow.js";
import { chatgpt } from "./services/chatgpt.js";

const server = fastify.fastify();

server.get("/", async (request, reply) => {
  return { hello: "serta" };
});

server.post("/webhook", async (request, reply) => {
  try {
    const message = objectFromWebhookResponse(request.body);

    // Si no es mensaje, que no haga nada
    if (message.type !== MessageTypes.notify) {
      return { success: "false" };
    }
    const user = await getUserByPhone(message.from);

    if (!user) {
      return { success: "false" };
    }

    let nextStep = "";
    const step = user.conversation_step;
    switch (step) {
      case "nuevo":
        await sendWhatsappText(
          user.phone,
          await chatgpt.MessageTypes(message.text)
        );
        // sendWhatsappQR(user.phone, "funciona");
        nextStep = "nuevo";
        break;

      case "inicio":
        const options = steps[step].nextStep;
        nextStep = options[Number.parseInt(message.text) - 1];

        if (!nextStep) {
          nextStep = "inicio";
          await sendWhatsappText(user.phone, `Selecciona una opción válida!`);
        } else {
          await sendWhatsappText(user.phone, `Haz seleccionado ${nextStep}`);
        }
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
  } catch (error) {
    console.log(error);
  }
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
