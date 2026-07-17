import express from "express";
import nodemailer from "nodemailer";

export const emailRouter = express.Router();

emailRouter.post("/send-lead", async (req, res) => {
  const { name, email, phone, company, businessType } = req.body;

  // Validação básica
  if (!name || !phone) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("[Email] SMTP credentials not configured.");
    return res.status(500).json({ error: "Configuração de email não encontrada." });
  }

  // Configurar transporte SMTP (Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"Capell Contabilidade - LP" <${smtpUser}>`,
    to: "contato@capell.com.br",
    bcc: "pvdigitalmkt@gmail.com",
    subject: "Novo Lead - Abertura de Empresa | Capell Contabilidade",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #001B6D; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Novo Lead - Abertura de Empresa</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
          <h2 style="color: #001B6D; margin-top: 0;">Dados do Contato</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%;">Nome:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${name}</td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">E-mail:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${email}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Telefone/WhatsApp:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Nome do Negócio:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${company}</td>
            </tr>` : ""}
            ${businessType ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Tipo de Negócio:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${businessType}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 25px; padding: 15px; background-color: #CAD1E4; border-radius: 6px;">
            <p style="margin: 0; color: #001B6D; font-size: 14px;">
              <strong>Origem:</strong> Landing Page - Abertura de Empresa<br>
              <strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error("[Email] Erro ao enviar email:", err);
    return res.status(500).json({ error: "Falha ao enviar email. Tente novamente." });
  }
});
