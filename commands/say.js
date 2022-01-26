const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	// captura a mensagem passada como argumento para ser reproduzida
	const sayMessage = args.join(" ");
	
	// tenta deletar a mensagem que ativou o comando
	try {
		
		message.delete({ timeout: 150 });
	// captura e exibe erro ao deletar a mensagem, caso ocorra
	} catch(e){

		console.log('Error: ', e);
	
	}
	// envia a mensagem passada como argumento
	message.channel.send(sayMessage);
}