const { devs, testServer } = require('../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, commandObj, msg) => {
  const commandObject = commandObj;

  try {
    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(msg.member.id)) {
        msg.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(msg.guild.id === testServer)) {
        msg.reply({
          content: 'This command cannot be ran here.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!msg.member.permissions.has(permission)) {
          msg.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = msg.guild.members.me;

        if (!bot.permissions.has(permission)) {
          msg.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, msg);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};