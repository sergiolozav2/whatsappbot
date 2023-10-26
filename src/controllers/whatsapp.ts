import twilio from "twilio";

import { account_sid, token } from "../constants/env";

export const client = twilio(account_sid, token);


const from = "whatsapp:+14155238886"
export function sendWhatsappText(to: string, message: string) {
    client.messages.create({
        from: from,
        to: `whatsapp:+${to}`,
        body: message,
    })
}
