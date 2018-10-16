const Discord = require('discord.js');

const Logger = require('./logger');
const Config = require('./config');
const Database = require('./database/database');

let client;

init();
async function init() {
    Logger.init();
    Logger.SetLevel(Logger.VERBOSE_LOGS);
    
    let config = new Config();
    config.load();

    await Database.init();
    Database.Server.lolxd();

    client = new Discord.Client();
}
