// variable to hold the reference to the discord.js node module
const Discord = require("discord.js"); // discord.js node module

// contains a string that is the password/token for the discord bot
const { token } = require("./config.json");

// variable for playing a game
var playing_game = 0; 

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
        message.reply("This bot has the following commands: ~help\n~commands\n~server age\n~members\n~discord age\n~member server age\n~game");
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

    // members list
    // fetch guild members returns a promise
    if(userInputText == "~members"){
        message.guild.members.fetch().then(
            (value) => {
                value.forEach(user => {
                    // print each user's username
                    message.reply(user.user.username);
                });
        
            }, (error) => {
                console.log(error); // prints errors if it occurs
            })
    }


    // GAME rock paper or scissors
    if(userInputText == "~game"){
        message.reply("Let's play rock, paper and scissors " + message.author.username + ". What is your choice, loser?")
        playing_game = 1;
    }
    
    const pcOptions = ["rock", "paper", "scissors"];  //  array for bot options
    const pcRoll = Math.floor(Math.random() * 3);  // generates a random number 0, 1 or 2
    
    // user chose rock
    if(userInputText == "rock" && playing_game){
        let statusMessage = "";

        if(pcOptions[pcRoll] ==  userInputText){
            statusMessage = "Oh no, it's a draw! " + message.author.username +"! :(";
        }
        else if(pcOptions[pcRoll] == "scissors"){
            statusMessage = "Luck you. You won, " + message.author.username + "! :X";
        }
        else if(pcOptions[pcRoll] == "paper"){
            statusMessage = "I told you're a loser, " + message.author.username + "! :)";
        }
        else{
            message.reply("Error in the code"); // only run if something is wrong
        }
        
        message.reply("I chose " + pcOptions[pcRoll] +". " + statusMessage + "\nDo you want to play again?");
        
    }
    
    
    // user chose paper
    if(userInputText == "paper" && playing_game){
        let statusMessage = "";

        if(pcOptions[pcRoll] ==  userInputText){
            statusMessage = "Oh no, it's a draw! " + message.author.username +"! :(";
        }
        else if(pcOptions[pcRoll] == "scissors"){
            statusMessage = "I told you're a loser, " + message.author.username + "! :)";
        }
        else if(pcOptions[pcRoll] == "rock"){
            statusMessage = "Luck you. You won, " + message.author.username + "! :X";
        }
        else{
            message.reply("Error in the code"); // only run if something is wrong
        }
        
        message.reply("I chose " + pcOptions[pcRoll] +". " + statusMessage + "\nDo you want to play again?");
    }
    
    
    // user chose scissors
    if(userInputText == "scissors" && playing_game){
        let statusMessage = "";
        
        if(pcOptions[pcRoll] ==  userInputText){
            statusMessage = "Oh no, it's a draw! " + message.author.username +"! :(";
        }
        else if(pcOptions[pcRoll] == "paper"){
            statusMessage = "Luck you. You won, " + message.author.username + "! :X";
        }
        else if(pcOptions[pcRoll] == "rock"){
            statusMessage = "I told you're a loser, " + message.author.username + "! :)";
        }
        else{
            message.reply("Error in the code"); // only run if something is wrong
        }
        
        message.reply("I chose " + pcOptions[pcRoll] +". " + statusMessage + "\nDo you want to play again?");
    }
    

    // Playing again
    if(userInputText == "no" || userInputText == "not" && playing_game){
        message.reply("Thanks for playing with me!");
        playing_game = 0;
    }
    
    if (userInputText == "yes" && playing_game){
        message.reply("What's your new choice?");
    }

});




// LOG IN
// Logs in the discord bot with the password stored in an external file
Client.login(token); 


