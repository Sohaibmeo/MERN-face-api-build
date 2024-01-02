import twilio from 'twilio'
import config from '../../config.js'

const accountSid = config.twilioConfigLive.accountSid;
const authToken = config.twilioConfigLive.authToken;

const client = twilio(accountSid,authToken);

const pushMessage = async(message,number)=> {
    try {
        console.log("Trying to send message")
        return await client.messages.create({
            body: message,
            to: number,
            from: config.twilioConfigLive.number,
        })
    } catch (error) {
        console.log("Could not succeed", error.message)
    }
}

export default pushMessage;