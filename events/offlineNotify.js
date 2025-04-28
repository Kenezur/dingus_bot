const { Events, EmbedBuilder } = require('discord.js');

/*module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldStatus, newStatus, client) {
        if (newStatus.user.id !== "1353273981754671198") return;

        var bot = await client.users.fetch("1353273981754671198");

        async function sendMessage() {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(message);

            var channel = await client.channels.fetch("1365317224314835057")
            
            await channel.send({ embeds: [embed] }).catch(err => {})
        }

        var timestamp = `<t:${Math.floor(Date.now() / 1000)}:R>`;
        if (oldStatus && newStatus.status !== "offline") {
            await sendMessage(`${bot.username} is back online! (${timestamp})`)
        } else if (oldStatus !== "offline" && newStatus == "offline") {
            await sendMessage(`${bot.username} is back online! (${timestamp})`)
        }
    }
}*/