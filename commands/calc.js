const Discord = require("discord.js");

// recebe uma formula matemática e usa eval() para resolvê-la
module.exports.run = async (client, message, args) => {
	let formula = args[0];
	let result;

	try {
		result = eval(formula); 
	} catch (e) {
		if (e instanceof SyntaxError) {
			message.channel.send('Alguma coisa estava errada nessa mensagem.');
			return;
		}
	}

	if (isFloat(result)) {
		result = result.toFixed(3);
	}

	message.channel.send("> " + result);
}

/* =-=-= FUNCTIONS =-=-= */

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
