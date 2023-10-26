export const steps = {
  inicio: {
    message: "Bienvenido a CaimanTec",
    nextStep: [steps.informacion, steps.comprar, steps.soporte],
  },

  informacion: {
    message: "Seleccionaste información",
    nextStep: [steps.respuestaInformacion],
  },
  comprar: {
    message: "Muestra productos",
    nextStep: [steps.cantidad],
  },
  soporte: {
    message: "Ingrese sus consultas",
    nextStep: [steps.respuesta],
  },

  cantidad: {
    message: "Pago",
    nextStep: [steps.pago],
  },
  pago: {
    message: "Lee QR",
    nextStep: [steps.verificacion],
  },
  verificacion: {
    message: "Pago recibido",
    nextStep: [steps.message], // Agregar registro de cliente con crm?
  },

  respuesta: {
    message: "Respuesta de ChatGPT",
    nextStep: [steps.soporte, steps.inicio],
  },
  respuestaInformacion: {
    message: "Respuesta de ChatGPT",
    nextStep: [steps.informacion, steps.inicio],
  },
};
