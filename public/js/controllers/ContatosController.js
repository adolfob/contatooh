angular.module('contatooh').controller('ContatosController', function($scope, Contato){

	function listaContatos(){
		Contato.query(function(contatos){
		$scope.contatos = contatos;
		}, function(error){
			console.log(error);	
			$scope.mensagem = {texto: 'Não foi possível pegar os contatos'};
		})	
	};

	$scope.remove = function(contato){
		Contato.delete({id: contato._id},
			listaContatos,
			function(error){
				console.log(error);
				$scope.mensagem = {texto: 'Não foi possível remover o contato'};
			}
		);
	};

	$scope.init = function(){
		listaContatos();
		$scope.contatos = []
		$scope.filtro = '';
		$scope.mensagem = {texto: ''};
	};
	
	$scope.init();


	

	

});