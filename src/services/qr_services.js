import axios from "axios";
import { chatgpt_key } from "../constants/env.js";

const endpointGeneration = "https://veripagos.com/api/bcp/generar-qr";
const endpointVerification = "https://veripagos.com/api/bcp/generar-qr";

const headers = {
  Authorization: ` Basic Auth`,
  "Content-Type": "application/json",
  Username: "HackXperience",
  Password: "rolUpiz-w9",
};

const headersVerification = {
  Authorization: ` Basic Auth`,
  "Content-Type": "application/json",
};
export const QR = {
  generateQR: async function () {
    const body = {
      secret_key: "",
      monto: 0,
      data: [],
      vigencia: "365/11:00",
    };
    const response = await axios.post(endpointGeneration, body, {
      headers: headers,
    });
    const success = response.data.Codigo;
    if (success == 0) {
      this.successGeneration(response.data.Data);
    } else {
      this.errorGeneration;
    }
    return message.message.content;
  },
  successGeneration: async function (response) {},
  errorGeneration: async function () {},

  verificationQR: async function (prompt) {
    const body = {
      secret_key: "",
      movimiento_id: "",
    };
    const response = await axios.post(endpointVerification, body, {
      headers: headersVerification,
    });
    const success = response.data.Codigo;
    if (success == 0) {
      this.successResponse(response.data.Data);
    } else {
      this.successResponse;
    }
    return message.message.content;
  },
  successResponse: async function (response) {},
  errorResponse: async function () {},
};
