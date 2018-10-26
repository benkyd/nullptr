import {Logger} from './logger';
import {Config} from './config';

export class Events {
    async init(client) {
        this.client = client;
        this.client.login(Config.Configuration.Token);
    }

    async handle() {
        this.client.on('ready', () => {
            console.log('cx');
        });
    }
}
