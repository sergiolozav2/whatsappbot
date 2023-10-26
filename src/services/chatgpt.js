import { ChatGPTAPI } from "chatgpt";
import { chatgpt_key } from "../constants/env.js";

export const chatgpt = new ChatGPTAPI({
  apiKey: chatgpt_key,
});
