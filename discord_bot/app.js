// variable to hold the reference to the discord.js node module
const Discord = require("discord.js"); // discord.js node module

// Gateway Instents were introduced by Dicord so bot developers can choose 
// which events bot receives based on which data it needs to function
// With partials we will be able to receive the full data of the objects returned from each event
// New application which is going to be our discord bot
// (partials make sure that we get the full data)
// The events are going to be returned from these intents
const Client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.GuildMessages, // Acess to messages wirtten in the guilt
        Discord.GatewayIntentBits.GuildMembers,  // Acess to guild members
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds         // Guild is a server (collection of channels and users)
    ], partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.User,
        Discord.Partials.GuildScheduledEvent
    ]
}); // Creating a new client with intents and partials needed for this bot to function

// BOT GETS ON
// We need to make sure that the bot gets online (application gets online)
// We do this by defining a ready event to make sure that the bot is actually up and running
// Ready event captures the state when the bot gets online
// Ready is the event and the second parametter is a function for what wil happen
Client.on("ready", (client) => {
    console.log("This bot is now online: " + client.user.tag); // bot name
});

// LOG IN
// Logs in the discord bot with the password stored in an external file
Client.login("MTA3NjkzNTk2NDM2ODMxMDMyMg.GZ8Lu4.vQzDAx6r3gqgdR-RskDbXQ_cn-iJWT7NpVnLpI");


