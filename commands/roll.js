const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	let quantity;
	let embed;
	let rolls;
	let dice;

	// captura a string passada como argumento
	args = Array.from(args[0]);

	// identifica a quantidade de rolagens a ser feita
	quantity = defineQuantity(args, args.indexOf('d'));
	// identifica o tipo de dado a ser rolado
	dice = defineDice(args, args.indexOf('d'));

	// rola os dados de acordo com quantidade e tipo
	rolls = randomize(quantity, dice);

	// organiza as rolagens decrescentemente
	rolls.sort( function(a, b) {
		if (a < b) return 1;
		if (a > b) return -1;
		return 0;
	});

	// soma o total dos valores rolados
	let total = addNumbers(rolls);
	// captura o maior valor para exibir separadamente
	let best = rolls.shift();

	//cria a embed que exibe as informações
	embed = new Discord.MessageEmbed()
		.setColor('#9B59B6')
		.setDescription(`[**${best}**, ${rolls.join(", ")}] -> __${total}__`);

	// envia a embed como mensagem
	message.lineReply(embed);
}

// captura a quantidade de rolagens
function defineQuantity(args, dIndex) {
	let result = new String();
	// verifica se valor de rolagens foi passado
	if (dIndex != 0) {
		// une as strings de cada posição do array em uma única string
		for (let i = 0; i < dIndex; i++) {
			result += args[i];
		}
		// converte a string para integer
		result = parseInt(result);
	} else {
		// caso não tenha informado quantidade, será 01	
		result = 1;
	}
	return result;
}

// captura o tipo de dado a ser rolado
function defineDice(args, dIndex) {
	let result = new String();
	// une  as strings de cada posição do array em uma única string
	for (let i = dIndex + 1; i < args.length; i++) {
		result += args[i];
	}
	// converte a string para integer
	result = parseInt(result);
	return result;
}

// faz uma rolagem aleatória da quantidade e tipo de dados informados
function randomize(quant, max) {
	let result = new Array();
	// para cada rolagem, armazena-se o resultado em um vetor
	for (i = 0; i < quant; i++) {
		result.push(Math.floor(Math.random() * max) + 1);
	}
	return result;
}

// soma os numeros de um vetor
function addNumbers(arr) {
	let result = new Number();
	for (let a of arr) {
		result += a;
	}
	return result
}