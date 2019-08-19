const sgMail = require("@sendgrid/mail")




sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: "Jin@g.io",
        subject: "Thanks for joining in!",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })


    
}

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "Jin@g.io",
        subject: "Good bye. Godspeed.",
        text: "It's been fun with you. Good luck. And why have you canceled your account?"
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}