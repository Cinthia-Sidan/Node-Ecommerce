import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport(
    {
        service: 'gmail',
        port: 587,
        auth: {
            user: "sidancin22@gmail.com",
            pass: "jmzlpxektcpjtbmr"
        }
    }
)


export const enviarMail=(to, subject, message)=>{
    return transport.sendMail(
        {
            from: "Web",
            to: to,
            subject: subject,
            html: message,
        }
    )
}

// export const enviarMail=(to, subject, message, adjuntos)=>{
//     return transport.sendMail(
//         {
//             from: "Cinthia Sidan sidancin22@gmail.com",
//             to: to,
//             subject: subject,
//             //text: "prueba"
//             html: message,
//             attachments: adjuntos
//         }
//     )
// }