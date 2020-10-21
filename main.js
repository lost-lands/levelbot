const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const express = require('express')
const app = express()
const request = require('request');

var DiscordGuild;

var missingParameters = {
    "Error": "Missing Parameters"
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  DiscordGuild = client.guilds.cache.get(config.guildID);
});

app.get('/levels/leaderboard/:limit/:page', (req, res) => { 
    request(`https://mee6.xyz/api/plugins/levels/leaderboard/${config.guildID}?limit=${req.params.limit}&page=${req.params.page}`).pipe(res)
})
app.get('/roles/info/:roleID', (req, res) => { 
    var role = DiscordGuild.roles.cache.get(req.params.roleID);   
    if (role) {
        res.json((role))
    } else {
        res.json(missingParameters);
    }
})


app.get('*', (req, res) => { 
    res.json({
        "name": "Lost Lands Discord API",
        "version": "1.0.0",
        "author": "DoubleCheck"
    });
})


client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(config.token);
app.listen(config.port, () => {
    console.log(`Discord API listening on port ${config.port}`)
})