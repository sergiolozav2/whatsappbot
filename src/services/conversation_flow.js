export const steps = {
  nuevo: {
    nextStep: ["inicio"],
  },
  inicio: {
    message: "Bienvenido a CaimanTec",
    nextStep: ["informacion", "comprar", "soporte"],
  },

  informacion: {
    message: "Seleccionaste información",
    nextStep: ["respuestaInformacion"],
  },
  comprar: {
    message: "Muestra productos",
    nextStep: ["cantidad"],
  },
  soporte: {
    message: "Ingrese sus consultas",
    nextStep: ["respuesta"],
  },

  cantidad: {
    message: "Pago",
    nextStep: ["pago"],
  },
  pago: {
    message: "Lee QR",
    nextStep: ["verificacion"],
  },
  verificacion: {
    message: "Pago recibido",
    nextStep: ["message"], // Agregar registro de cliente con crm?
  },

  respuesta: {
    message: "Respuesta de ChatGPT",
    nextStep: ["soporte", "inicio"],
  },
  respuestaInformacion: {
    message: "Respuesta de ChatGPT",
    nextStep: ["informacion", "inicio"],
  },
};
