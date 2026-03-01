// ===== GLOBAL ERROR HANDLER (ANTI CRASH) =====
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder, ChannelType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ===== BOT READY =====
client.on("clientReady", () => {
    console.log(`✅ Bot online sebagai ${client.user.tag}`);
});

// ===== MEMBER MASUK =====
client.on("guildMemberAdd", async (member) => {
    try {
        const channel = member.guild.channels.cache.find(
            ch => ch.name === "welcome" && ch.type === ChannelType.GuildText
        );

        if (!channel) return console.log("⚠ Channel welcome tidak ditemukan");

        const embed = new EmbedBuilder()
            .setColor("#00ff88")
            .setTitle("🎉 Welcome!")
            .setDescription(`Halo ${member} 👋\nSelamat datang di **${member.guild.name}**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Total Member", value: `${member.guild.memberCount}`, inline: true }
            )
            .setTimestamp();

        await channel.send({ embeds: [embed] });

    } catch (err) {
        console.error("Error di guildMemberAdd:", err);
    }
});

// ===== MEMBER KELUAR =====
client.on("guildMemberRemove", async (member) => {
    try {
        const channel = member.guild.channels.cache.find(
            ch => ch.name === "goodbye" && ch.type === ChannelType.GuildText
        );

        if (!channel) return console.log("⚠ Channel goodbye tidak ditemukan");

        const embed = new EmbedBuilder()
            .setColor("#ff4444")
            .setTitle("👋 Goodbye!")
            .setDescription(`${member.user.tag} telah keluar dari server.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Sisa Member", value: `${member.guild.memberCount}`, inline: true }
            )
            .setTimestamp();

        await channel.send({ embeds: [embed] });

    } catch (err) {
        console.error("Error di guildMemberRemove:", err);
    }
});

client.login(process.env.TOKEN);