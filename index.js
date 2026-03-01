const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.on("clientReady", () => {
    console.log(`Bot online sebagai ${client.user.tag}`);
});

// MEMBER MASUK
client.on("guildMemberAdd", async (member) => {

    const channel = member.guild.channels.cache.find(
        ch => ch.name === "welcome"
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor("#00ff88")
        .setTitle("🎉 Welcome!")
        .setDescription(`Halo ${member} 👋\nSelamat datang di **${member.guild.name}**`)
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            { name: "Total Member", value: `${member.guild.memberCount}`, inline: true }
        )
        .setTimestamp();

    channel.send({ embeds: [embed] });
});

// MEMBER KELUAR
client.on("guildMemberRemove", async (member) => {

    const channel = member.guild.channels.cache.find(
        ch => ch.name === "goodbye"
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor("#ff4444")
        .setTitle("👋 Goodbye!")
        .setDescription(`${member.user.tag} telah keluar dari server.`)
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            { name: "Sisa Member", value: `${member.guild.memberCount}`, inline: true }
        )
        .setTimestamp();

    channel.send({ embeds: [embed] });
});

require('dotenv').config()
client.login(process.env.TOKEN)