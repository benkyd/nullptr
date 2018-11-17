import {Logger} from './logger';

export class MessageManager {
    static async init() {
        
    }

    static async handleMessage(message, client, next) {
        if (client.user.id == message.author.id) return;        
        if (message.limiting) message.channel.send(`${message.author} You are being rate limited`);
        next();
    }
}
