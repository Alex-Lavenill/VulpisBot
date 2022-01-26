const Discord = require("discord.js");

// cria e envia uma embed com informações sobre os comandos do bot
module.exports.run = async (client, message, args) => {	
	let embed = new Discord.MessageEmbed().setDescription(
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
		`);
		
	message.channel.send(embed);
}