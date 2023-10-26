import axios from "axios";

const account_token = "65397bc2e2e86";
const instance_id = "653A6E4C73CAB";

const url = "https://whatsapp.toolhero.tech/api/";
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};
export async function sendWhatsappText(to, message) {
  const data = {
    number: to,
    type: "text",
    message: message,
    instance_id: instance_id,
    access_token: account_token,
  };
  const response = await axios.post(`${url}send`, data, defaultHeaders);
  return response;
}

export const MessageTypes = {
  notify: "notify",
  unknown: "unknown",
};

export function objectFromWebhookResponse(body) {
  const data = body.data.data;
  const firstMessage = data.messages[0];
  const type = data.type;

  const phone = firstMessage.key.remoteJid.split("@")[0];
  const text = firstMessage.message.conversation ?? firstMessage.message.extendedTextMessage.text;

  return { from: phone, type, text };
}

export async function setWebhook(webhook_url) {
  const endpoint = `set_webhook?webhook_url=${webhook_url}&enable=true&instance_id=${instance_id}&access_token=${account_token}`;

  const response = await axios.get(`${url}${endpoint}`);
  console.log(response);
  return response;
}
