const Discord = require("discord.js");

// cria e envia uma embed com informações sobre os comandos do bot
module.exports.run = async (client, message, args) => {	
	let embed = new Discord.MessageEmbed()
		.setColor('#9B59B6')
		.setTitle('Olá, eu sou Vulpis!')
		.setDescription(
			`**$say** <frase>
			> Repete a frase escrita após o comando. Deleta a mensagem de comando.
			**$roll** <x>d<y>
			> Rola dados. Onde X é a quantidade de dados a ser rolada e Y o tipo/maior número do dado.
			**$calc** <calculo>
			> Resolve cálculos matemáticos.
			> __Operadores:__
			> \` + \` Adição
			> \` - \` Subtração
			> \` / \` Divisão
			> \` * \` Múltiplicação
			> \` ^ \` Potenciação
		`)
		.addField('GitHub', 'https://github.com/Alex-Lavenill/VulpisBot')
	message.channel.send(embed);
}