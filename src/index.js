import Discord from 'discord.js';

import {Logger} from './logger';
import {Config} from './config';
import {Database} from './database/database';
import {Events} from './events';

init();
async function init() {
    Logger.init();
    Logger.SetLevel(Logger.VERBOSE_LOGS);
    
    Config.init();
    Config.load();

    await Database.init();

    const client = new Discord.Client();

    const eventHandler = new Events();
    await eventHandler.init(client);
    eventHandler.handleEvents();
}
