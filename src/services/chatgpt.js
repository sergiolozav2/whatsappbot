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
    const message =  response.data.choices[0];
    return message.message.content
  },
  
};
