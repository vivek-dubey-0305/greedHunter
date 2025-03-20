import nodeMailer from "nodemailer"

export const sendEmail = async ({ email, subject, message }) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        // service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        // dkim: {
        //     domainName: "greedhunter.com", // Your domain name
        //     keySelector: "default", // Match this with your DKIM setup in Hostinger
        //     privateKey: process.env.DKIM_PRIVATE_KEY, // Add your DKIM private key here
        //   },
    })


    const options = {
        from: `"GreedHunter" <${process.env.SMTP_MAIL}>`,
        to: email,
        subject,
        html: message,
        headers: {
            "X-Priority": "3",
            "X-Mailer": "Nodemailer",
            "List-Unsubscribe": `<mailto:hunter@greedhunter.com>`, // Helps email providers understand user preferences
        },
    }

    try {
        await transporter.sendMail(options);
        console.log(`✅ Email sent successfully to ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send email");
    }

}