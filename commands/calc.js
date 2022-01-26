const Discord = require("discord.js");

// recebe uma formula matemática e usa eval() para resolvê-la
module.exports.run = async (client, message, args) => {
	// indepde entrada de strings
	if (1 === typeof (args[0])) {

		let sayMessage = eval(args[0]);
		message.channel.send("> " + sayMessage.toFixed(3));

	}
}



