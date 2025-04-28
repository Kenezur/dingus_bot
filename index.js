const { channel } = require('diagnostics_channel');
const { Client, IntentsBitField, Guild, Permissions, Collection, PermissionsBitField, MessageManager } = require('discord.js');
const { PassThrough } = require('stream');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const eventHandler = require('./handlers/eventHandler');
const handleCommands = require('./events/interactionCreate/handleCommands');
const Discord = require("discord.js");
const getLocalCommands = require('./utils/getLocalCommands');
const handleRawCommands = require('./events/interactionCreate/handleRawCommands');

require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildMessageTyping
    ],
    partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER']
});

/*client.on('guildMemberRemove', (member) => {
    const channelid = '1364716901703618741';
    client.channels.cache.get(channelid).send(`${member.displayName} has left TwT`);
})*/

client.on('guildMemberAdd', (member) => {
    const channelid = '1352982594870050819'; 
    client.channels.cache.get(channelid).send(`Welcome ${member.displayName}, hope you have fun in the epic server! :3 ||${member.user}||`);
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
    const oldStatus = oldMember.premiumSince;
    const newStatus = newMember.premiumSince;

    if(!oldStatus && newStatus) {
        const channelid = '1353692727081963520'; 
        client.channels.cache.get(channelid).send(`${member.user} BOOSTED THE SERVER!!!!!!! `);
    }
})

eventHandler(client);

client.on('messageCreate', async msg =>{
  const prefix = "bwa?";
  
  // get mod role:
  const fwaBwa = client.guilds.cache.get('1352982594358087710');
  const modRole = fwaBwa.roles.cache.get('1353354410549575770');


  if (msg.content.startsWith(prefix)){
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    try {
      const args = msg.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
      
      const localcommands = getLocalCommands()
      const commandObj = localcommands.find((cmd) => cmd.name === command);
      
      if (!commandObj){
        msg.reply("That is not an available command!");
      }
      if(commandObj) handleRawCommands(client, commandObj, msg);
      
    } catch (error) {
      console.log(error);
    }
  };

  if (msg.author.bot) return;

  if (msg.content.includes(('crazy' || 'CRAZY'))) {
    msg.reply(`Crazy? \nI was crazy once \nthey put me in a room \na room full of rats \nand rats? \nRats make me go crazy.`);
  }

  const greets = ['hi', 'hello', 'hai', 'hewwo', ]
  const meows = ['meow', 'meowwww', 'mrroww', 'nya', 'nyaa~', 'purrrrr', 'mrrrp', 'meoooww', 'meeowwww', 'meoww']

  if(msg.mentions.has(client.user) && !msg.author.bot){
    if (msg.content.includes('sybau')){
      msg.reply('ts pmo 🥀🥀🥀🥀🥀')
    } else{
      var isGreeting = false;
      for(var greeting of greets){
        if (msg.content.toLowerCase() === greeting && isGreeting === false){
          msg.reply('hellooo!!!!');
          isGreeting = true;
        }
      }
      if (!isGreeting){
          const random = Math.floor(Math.random() * meows.length);
          msg.reply(meows[random]);
      }
    }
  }

  if (msg.content.includes('stawp')) {
		msg.reply(`naurr :3`);
  }

  if (msg.content.includes("kys" || "nigger" || "faggot")) {
		msg.reply(`${modRole} ban him frfr`);
  }
})

client.login(
    'MTM1MzI3Mzk4MTc1NDY3MTE5OA.GLOHMp.1lcUQzAQrFGKcVuqvvKoOx3kPCEOC7C3BACk2g'
);