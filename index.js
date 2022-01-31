const Discord = require('discord.js'); // Conexão com a biblioteca do discord
const client = new Discord.Client(); // Criação de um novo client
const config = require("./config.json"); // Pegando o prefixo do bot para respostas de comandos
const mySecret = process.env['TOKEN']; // Acessando o token do bot
require('discord-inline-reply');
const express = require('express');
const app = express();
// const db = require('./database/db');
// const register = require('./database/registration/phrase');

// Recebe o ping
app.get("/", (request, response) => {
	const ping = new Date(new Date().toUTCString())
	ping.setHours(ping.getHours() - 3);
	console.log(`Ping < ${ping.getHours()}:${ping.getMinutes()}:${ping.getSeconds()} >`); 
	response.sendStatus(200);
});
// Recebe a solicitação que deixa-o online
app.listen(process.env.PORT);

// Define ações de quando o bot é iniciado
client.on('ready', () => {
	console.log(`Bot iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
	/*
	 Seta activity mostrando o comando de ajuda e o número atual de servidores em que o bot está
	 	-Type 0 = Playing
		-Type 1 = Streaming
		-Type 2 = Listening to
		-Type 3 = Watching
	 */
	client.user.setActivity(`$help | Em ${client.guilds.cache.size} servidores.`, { type: 2 });
})

// Emite log quando é adicionado a um servidor e atualiza os servidores presentes
client.on('guildCreate', () => {
	console.log(`Adicionado ao servidor: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`$help | Em ${client.guilds.cache.size} servidores.`, { type: 2 });
})

// Emite log quando é adicionado a um servidor e atualiza os servidores presentes
client.on('guildDelete', () => {
	console.log(`Removido do servidor: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`$help | Em ${client.guilds.cache.size} servidores.`, { type: 2 });
})

// Captura mensagem e verifica comando
client.on("message", async message => {
	// if (message.author.bot) return;
	if (message.channel.type == "dm") return; // Não responde mensagem direta
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;
	if (message.content.startsWith('<@!${client.user.id}>') || message.content.startsWith('<@{client.user.id>')) return;

	const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require('./commands/'+ command +'.js')
		commandFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
})

// Ligando o bot caso ele consiga acessar o Token
client.login(mySecret);
