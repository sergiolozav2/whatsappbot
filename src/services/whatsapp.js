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
