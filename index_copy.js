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
    ]
});

client.on('messageCreate', async msg =>{
  const prefix = "bwa?";

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

  if (msg.content.includes("crazy")) {
		msg.reply(`Crazy? \nI was crazy once \nthey put me in a room \na room full of rats \nand rats? \nRats make me go crazy.`);
	}
  
  const greets = ['hi', 'Hi', 'hello', 'Hello', 'hai', 'Hai', 'hewwo', 'Hewwo']

  if(msg.mentions.has(client.user) && !msg.author.bot){
    if (msg.content.includes('sybau')){
      msg.reply('ts pmo 🥀🥀🥀🥀🥀')
    }
    else{
      var isGreeting = false;
      for(var greeting of greets){
        if (msg.content.includes(greeting) && isGreeting === false){
          msg.reply('hellooo!!!!');
          isGreeting = true;
        }
      }
      if (!isGreeting){
          msg.reply('meow');
      }
    }
  }

  if (msg.content.includes('stawp')) {
		msg.reply(`naurr :3`);
  }

})



eventHandler(client);

/*let channel // <-- your pre-filled channel variable

channel.messages.fetch({ limit: 1 }).then(messages => {
  let lastMessage = messages.first();
  
  if (!lastMessage.author.bot) {
    // The author of the last message wasn't a bot
  }
})
.catch(console.error);*/

//this is for testing the new things out

client.login(
    'MTM2NDg2OTc1NjUyNzU3NTA1MQ.GvCdp0.eVeX5MrNDAfzfgYfSpimCPoe1vH-UjmeVVSRXc'
);

// counting in a channel
/*
const countChannel = '1365752326488592405';
const theChannel = client.channels.cache.get(countChannel);
console.log(theChannel);
theChannel.messages.fetch({ limit: 1 }).then(messages => {
  let lastMessage = messages.first();
  if(!lastMessage.author.bot){
    console.log(lastMessage + 1);
  }
}).catch(console.error);
*/