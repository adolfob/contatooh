module.exports = function(app){

	var Contato = app.models.contato;
	var controller = {};
	
	controller.listarContatos = function(req, res){

		Contato.find().populate('emergencia').exec()
			.then(function(contatos){
				res.json(contatos);
			}, function(error){
				console.log(error);
				res.status(500).json(error);
			})
		
	}
	controller.obterContato = function(req, res){

		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(function(result){
				res.json(result);
			}, function(error){
				console.log(error);
				res.status(404).json(error);
			})
		
	}
	controller.removeContato = function(req, res){
		var _id = req.params.id;
		Contato.remove({"_id":_id}).exec()
			.then(function(result){
				res.status(204).end();
			}, function(error){
				console.log(error);
				res.status(500).json(error);	
			})
	}

	controller.salvarContato = function(req, res){
		var _id = req.body._id;
		req.body.emergencia = req.body.emergencia || null;
		if(_id){
			Contato.findByIdAndUpdate(_id, req.body).exec()
				.then(function(result){
					res.json(result);
				}, function(error){
					console.log(error);
					res.status(500).json(error);			
				}
			)
		} else{
			Contato.create(req.body)
				.then(function(result){
					res.status(201).json(result);
				}, function(error){
					console.log(error);
					res.status(500).json(error);	
				}
			)
		}
	}

	return controller;
}