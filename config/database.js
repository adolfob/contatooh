var mongoose = require('mongoose');

module.exports = function(uri){
	mongoose.connect(uri);

	mongoose.connection.on('connected', function(){
		console.log("Mongoose! Conectado ao banco " + uri);
	})
	mongoose.connection.on('disconnected', function(){
		console.log("Mongoose! Desconectado do banco " + uri);
	})
	mongoose.connection.on('error', function(erro){
		console.log("Mongoose! Erro na conexão: " + erro);
	})

	// Habilita o debug do mongoose
	mongoose.set('debug', true);

	// Fecha a conexão com o banco quando a app é encerrada

	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log("Mongoose! Desconectado pelo término da aplicação.");
		});
	});

}