const express = require('express');
const app = express();

app.get("/", (request, response) => {
	const ping = new Date(new Date().toUTCString())
	ping.setHours(ping.getHours() - 3);
	console.log('Ping recebido ás '+ ping.getHours() +':'+ ping.getMinutes() +':'+ ping.getSeconds()); 
	response.sendStatus(200)
});
// Recebe a solicitação que deixa-o online
app.listen(process.env.PORT);

// Conexão com a biblioteca do discord
const Discord = require('discord.js');

// Criação de um novo client
const client = new Discord.Client();

// Pegando o prefixo do bot para respostas de comandos
const config = require("./config.json");

client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") return;
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;
	if (message.content.startsWith('<@!${client.user.id}>') || message.content.startsWith('<@{client.user.id>')) return;

	const args = message.content
		.trim().slice(config.prefix.length)
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require('./commands/'+ command +'.js')
		commandFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
})

// Ligando o bot caso ele consiga acessar o Token
client.login(process.env.TOKEN);
