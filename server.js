import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Função para validar e-mail simples
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

app.post('/enviar-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validações básicas
    if (!name || !email || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Campos obrigatórios não preenchidos.' 
      });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'E-mail inválido.' 
      });
    }
    
    if (name.length > 100 || subject?.length > 100 || message.length > 1000) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Um ou mais campos ultrapassam o limite de caracteres.' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.EMAIL_USER,
      subject: subject || 'Nova mensagem do site',
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject || 'Não informado'}</p>
        <p><strong>Mensagem:</strong><br/>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      `
    });

    res.status(200).json({ 
      status: 'success', 
      message: 'E-mail enviado com sucesso!' 
    });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ 
      status: 'error', 
      message: 'Erro ao enviar o e-mail.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
