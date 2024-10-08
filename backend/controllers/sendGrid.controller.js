require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const { recipients: recipients, subject, text, html } = req.body;

  const messages = recipients.map((recipient) => ({
    to: recipient,
    from: "siga.academico.co@gmail.com",
    subject,
    text,
    html,
  }));

  try {
    await sgMail.send(messages);
    res.status(200).json({ message: "Correos enviados exitosamente" });
  } catch (error) {
    console.error("Error enviardo correos masivos", error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ message: "Error enviardo correos", error });
  }
};

module.exports = { sendEmail };
