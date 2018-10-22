import Discord from 'discord.js';

import {Logger} from './logger';
import {Config} from './config';
import {Database} from './database/database';

let client;

init();
async function init() {
    Logger.init();
    Logger.SetLevel(Logger.VERBOSE_LOGS);
    
    const config = new Config();
    config.load();

    await Database.init();
    Database.server.lolxd();

    client = new Discord.Client();
}
