import axios from "axios";
import { chatgpt_key } from "../constants/env.js";

const endpoint = "https://api.openai.com/v1/chat/completions";

const headers = {
  Authorization: `Bearer ${chatgpt_key}`,
  "Content-Type": "application/json",
};

export const chatgpt = {
  sendMessage: async function (prompt) {
    const body = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-16k",
    };
    const response = await axios.post(endpoint, body, { headers: headers });
    const message = response.data.choices[0];
    return message.message.content;
  },
  sendMessageInformation: async function (prompt) {
    const body = {
      messages: [
        {
          role: "user",
          content:
            "Ofrecemos Compra de Servicios, Informacion y Soporte, ofrece esas opciones al cliente que  nos escribio: " +
            prompt,
        },
      ],
      model: "gpt-3.5-turbo-16k",
    };
    const response = await axios.post(endpoint, body, { headers: headers });
    const message = response.data.choices[0];
    return message.message.content;
  },
  sendMessageCotizacion: async function (prompt) {
    const body = {
      messages: [
        {
          role: "user",
          content:
            "Nuestros servicios son Consultoria a 150Bs, Desarrollo a 3000bs, Analisis de Datos a 2000bs, da una respuesta corta cotizale al cliente que envió este mensaje: " +
            prompt,
        },
      ],
      model: "gpt-3.5-turbo-16k",
    };
    const response = await axios.post(endpoint, body, { headers: headers });
    const message = response.data.choices[0];
    return message.message.content;
  },
  MessageTypes: async function (prompt) {
    const body = {
      messages: [
        {
          role: "user",
          content:
            " 1. Compra de Servicios, 2. Informacion y 3. Soporte y dentro de servicios están 4. Consultoria a 150Bs, 5. Desarrollo a 3000bs, 6. Analisis de Datos a 2000bs, devuelve el numero de lo que le interesó al cliente que le interesó al cliente y si le interesa comprar devuelve 9: " +
            prompt,
        },
      ],
      model: "gpt-3.5-turbo-16k",
    };
    const response = await axios.post(endpoint, body, { headers: headers });
    const message = response.data.choices[0];
    return message.message.content;
  },
  sendMessageVentaExitosa: async function (prompt) {
    const body = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-16k",
    };
    const response = await axios.post(endpoint, body, { headers: headers });
    const message = response.data.choices[0];
    return message.message.content;
  },
  sendMessageFinalizar: async function (prompt) {
    const body = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-16k",
    };
    const response = await axios.post(endpoint, body, { headers: headers });
    const message = response.data.choices[0];
    return message.message.content;
  },
};
