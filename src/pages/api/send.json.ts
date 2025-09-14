import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response(
      JSON.stringify({
        message: "Por favor, completa todos los campos.",
      }),
      { status: 400 },
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Remitente controlado por el backend
      to: ["octav0773@gmail.com"], // Destinatario controlado por el backend
      subject: `Portafolio: ${subject}`,
      reply_to: email, // Para que puedas responder directamente al usuario
      html: `
        <p>Has recibido un nuevo mensaje de tu portafolio:</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return new Response(
        JSON.stringify({
          message: "Error al enviar el mensaje.",
          error: error.message,
        }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "¡Mensaje enviado con éxito!",
      }),
      { status: 200 },
    );
  } catch (exception) {
    console.error({ exception });
    return new Response(
      JSON.stringify({
        message: "Algo salió mal.",
      }),
      { status: 500 },
    );
  }
};
