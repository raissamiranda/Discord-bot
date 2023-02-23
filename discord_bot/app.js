// variable to hold the reference to the discord.js node module
const Discord = require("discord.js"); // discord.js node module

// contains a string that is the password/token for the discord bot
const { token } = require("./config.json");

// Gateway Intents were introduced by Discord so bot developers can choose 
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


// messageCreate event captures data of a message that is created/posted
Client.on("messageCreate", (message) => {
    // message content to lower case only
    const userInputText = message.content.toLowerCase();

    // only allow non-bots to perform any code execution
    if(message.author.bot) {return };
    console.log("a new message was written!");

    // only run this code is the user that wrote the message is NOT a bot
    if (!message.author.bot){
        //message.reply("Hmmm, I think you're not a bot, " + message.author.username + "!");
    }

    // commands
    if(userInputText == "~commands" || userInputText == "~help"){
        message.reply("This bot has the following commands: ~help\n~commands\n~server age\n~member\n~discord age\n~member server age");
    }

    // server age
    if(userInputText == "~server age"){
        //console.log(message.guild.createdTimestamp); // milisenconds
        //console.log(new Date(message.guild.createdTimestamp)); // converts manually
        //console.log(message.guild.createdAt);  // converts automatically
        //console.log(message.guild.createdAt.toString()); // date more readable

        message.reply(message.guild.name + " was created on " + message.guild.createdAt.toString() + "!");
    } 

    // member discord age
    if(userInputText == "~member discord age"){
        message.reply(message.author.username + " in discord since " + message.author.createdAt.toString() + "!");
    }
    
    // member server age
    if(userInputText == "~member server age"){
        message.reply(message.author.username + " in " + message.guild.name +  " since " + message.member.joinedAt.toString() + "!");
    }

});


// LOG IN
// Logs in the discord bot with the password stored in an external file
Client.login(token); 


