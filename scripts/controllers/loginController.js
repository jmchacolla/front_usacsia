'use strict';

angular.module("adminApp")
.controller('LoginCtrl', function (authUser) {
	var vm = this;
	vm.loginForm = {
	usu_nick: '811863',
	password: '811863'
	};

	vm.login = function(){
		authUser.loginApi(vm.loginForm);
	}

})



;