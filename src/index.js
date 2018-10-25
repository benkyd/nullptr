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
    Logger.debug(JSON.stringify(await Database.Guilds.newGuild(1234, "Hello"), null, 4));
    Logger.debug(JSON.stringify(await Database.Guilds.deleteGuild(1234), null, 4));

    client = new Discord.Client();
}
