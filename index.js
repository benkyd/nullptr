const Logger = require('./logger');
const Config = require('./config');
// const Discord = require('discord.js');
// const client = new Discord.Client();

Logger.init();
let config = new Config('./config.json')
config.load();

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('message', msg => {
//   if (msg.content === 'ping') {
//     msg.reply('Pong!');
//   }
// });

// client.login('token');