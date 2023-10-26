import { chatgpt_key } from "../constants/env.js";


const endpoint = 'https://api.chatgpt.com/v1/completions';


export const chatgpt = new ChatGPTAPI({
  apiKey: chatgpt_key,
});
