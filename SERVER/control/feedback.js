const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailFeedback = (req, res) => {
  //console.log(req.body);
  const { name, email, message, phone, uploadedFiles } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: "Feedback form",
    html: `
       <h1>CUSTOMER FEEDBaCK</h1>
       <hr/>
       <h2>Sender's name: ${name}</hr>
       <h2>Sender's email: ${email}</hr>
       <h2>Sender's message: ${message}</hr>
       <br />
        ${uploadedFiles.map((file) => {
          return `<img src="${file.secure_url}" alt="Image" style="width:50%;overflow:hidden;padding:50px;"  />`;
        })}
        <hr />
        <p>https://feedbackonline.com</p>
      `,
  };

  sgMail.send(emailData)
    .then((sent) => {
      console.log(sent);
      console.log("Hello");
      return res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false });
    });
};
