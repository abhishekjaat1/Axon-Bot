const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Command: !dm @user message here
    if (message.content.startsWith('!dm')) {
        const args = message.content.split(' ').slice(1);
        const user = message.mentions.users.first();

        if (!user) {
            return message.reply('Please mention a user to DM.');
        }

        const dmMessage = args.slice(1).join(' ');
        if (!dmMessage) {
            return message.reply('Please provide a message to send.');
        }

        try {
            await user.send(dmMessage);
            await message.reply(`✅ Message sent to ${user.tag}`);
        } catch (error) {
            console.error(error);
            await message.reply(`❌ Could not send a DM to ${user.tag}`);
        }
    }
});

client.login('YOUR_TOKEN');