const accountSid = 'AC58d361540722401fd5c87ff52c8554e3';
const authToken = 'a926bd59c38618983d4656da2f2a2044';
//const client = require('twilio')(accountSid, authToken);
import twilio from 'twilio'

const client = twilio(accountSid, authToken)

client.messages
    .create({
        body: 'Mensaje de prueba de Whats App',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5492613018098'
    })
    .then(message => console.log(message.sid))
