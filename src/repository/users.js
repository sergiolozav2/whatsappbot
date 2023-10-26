import { steps } from "../services/conversation_flow.js";

const allowedNumbers = new Set(["59175034784", "59170005958"]);
const usersDb = {};

export async function getUserByPhone(phone) {

  if(!allowedNumbers.has(phone)) {
    return;
  }

  if (!usersDb[phone]) {
    usersDb[phone] = {
      id: 1,
      name: "Usuario nuevo",
      phone: phone,
      conversation_step: "nuevo",
    };
  }

  const user = usersDb[phone];

  return user;
}

export async function updateUserConversationStep(userPhone, step) {
  usersDb[userPhone].conversation_step = step;
  return usersDb[userPhone];
}
