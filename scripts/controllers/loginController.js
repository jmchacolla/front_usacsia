'use strict';

angular.module("adminApp")
.controller('LoginCtrl', function (authUser) {
	var vm = this;
	vm.loginForm = {
	usu_nick: '83062745',
	password: '83062745'
	};

	vm.login = function(){
		authUser.loginApi(vm.loginForm);
	}

})



;