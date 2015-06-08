angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, Contato){
	console.log($routeParams.contatoId);
	$scope.contatoId = $routeParams.contatoId;
	
	Contato.query(function(contatos){
		$scope.contatos = contatos;	
	});
	
	if($routeParams.contatoId){
		Contato.get({id: $routeParams.contatoId}, function(contato){
			$scope.contato = contato;
		}, function(erro){
			$scope.mensagem = {texto: 'Não foi possível pegar o contato com id ' + $routeParams.contatoId};
			console.log(erro);
		})	
	}else{
		$scope.contato = new Contato();
	}

	$scope.salvar = function(contato){
		$scope.contato.$save()
			.then(function(res){
				$scope.mensagem = {texto: 'Contato salvo com sucesso!'};
				$scope.contato = new Contato();
			})
			.catch(function(erro){
				$scope.mensagem = {texto: 'Ocorreu um erro ao salvar contato'};
			})
	}
	
})