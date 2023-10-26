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
    access_token: account_token
  };
  const response = await axios.post(`${url}send`, data, defaultHeaders);
  return response
}

export const MessageTypes = {
  text: "text",
  image: "image",
  unknown: "unknown"
}

export function objectFromWebhookResponse(body) {
  const value = body?.entry[0]?.changes[0]?.value
  const { messages } = value;
  const message = messages[0]
  let text = "";
  let { from, type = MessageTypes.unknown } = message
  
  if(type === MessageTypes.text) {
    text = message.text.body;
  }

  return { from, type, text}

}

export async function setWebhook(webhook_url) {
  const endpoint = `set_webhook?webhook_url=${webhook_url}&enable=true&instance_id=${instance_id}&access_token=${account_token}`

  const response = await axios.get(`${url}${endpoint}`)
  console.log(response)
  return response;
}