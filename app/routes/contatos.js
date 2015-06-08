function verificaAutenticacao(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}else{
			res.status(401).json("Não autorizado");
		}
	}

module.exports = function(app){
	var controller = app.controllers.contato;
	app.route('/contatos')
		.get(verificaAutenticacao, controller.listarContatos)
		.post(verificaAutenticacao, controller.salvarContato);
	app.route('/contatos/:id')
		.get(verificaAutenticacao, controller.obterContato)
		.delete(verificaAutenticacao, controller.removeContato);


	
}