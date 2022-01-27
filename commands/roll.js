const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	if (!args[0]) return message.lineReply('**Comando vazio.** Em caso de dúvida use ` $help. `');
	let quantity;
	let embed;
	let rolls;
	let dice;

	// captura as string passadas como argumento
	let arr = Array.from(args.shift());
	let phrase = args.join(" ");

	
	
	
	
	// identifica soma




	console.log('arr ', arr);
	if (arr.includes('+')) {
		let plus = arr.slice(-( arr.length - arr.indexOf('+') )-1);
		// plus = plus.shift();
		console.log(plus);
	}
	console.log('arr ', arr);







	// identifica a quantidade de rolagens a ser feita
	quantity = defineQuantity(arr, arr.indexOf('d'));

	// identifica o tipo de dado a ser rolado
	dice = defineDice(arr, arr.indexOf('d'));
	console.log(dice);

	// rola os dados de acordo com quantidade e tipo
	rolls = randomize(quantity, dice);

	// organiza as rolagens decrescentemente
	rolls.sort( function(a, b) {
		if (a < b) return 1;
		if (a > b) return -1;
		return 0;
	});

	// soma o total dos valores rolados
	let total = calculateTotal(rolls);
	// captura o maior valor para exibir separadamente
	let best = rolls.shift();

	//cria a embed que exibe as informações
	if (rolls.length == 0) {
		embed = configUnicEmbed(best, arr, phrase);
	} else {
		embed = configMultEmbed(rolls, best, total, arr, phrase);
	}

	// envia a embed como mensagem
	message.lineReply(embed);
}

/* =-=-= FUNCTIONS =-=-= */

// cria uma embed que exibir um único valor
function configUnicEmbed(value, dice, title = '') {
	return new Discord.MessageEmbed()
		.setColor('#9B59B6')
		.setTitle(title)
		.addField(
			`${dice.join('').toLowerCase()} Result: `,
			`[${value}]`);
}

// cria uma embed que exibe multiplos valores
function configMultEmbed(arr, value, total, dice, title = '') {
		return new Discord.MessageEmbed()
			.setColor('#9B59B6')
			.setTitle(title)
			.addField(
				`${dice.join('').toLowerCase()} Result: `, 
				`[**${value}**, ${arr.join(", ")}] => ${total}`
			);
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
	for (let i = dIndex+1; i < args.length; i++) {
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
function calculateTotal(arr) {
	let result = new Number();
	for (let a of arr) {
		result += a;
	}
	return result
}