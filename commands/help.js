const Discord = require("discord.js");

// cria e envia uma embed com informações sobre os comandos do bot
module.exports.run = async (client, message, args) => {	
	let embed = new Discord.MessageEmbed().setDescription(
		`**$say** <frase>
		 > O bot repete a frase
		 **$roll** <x>d<y>
		 > Ele rola um dado. x = quantidade; y = tipo de dado.
		`);
		
	message.channel.send(embed);
}