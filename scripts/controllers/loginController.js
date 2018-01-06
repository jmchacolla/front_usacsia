'use strict';

angular.module("adminApp")
.controller('LoginCtrl', function (authUser) {
	var vm = this;
	vm.loginForm = {
	usu_nick: '121815027',
	password: '121815027'
	};

	vm.login = function(){
		authUser.loginApi(vm.loginForm);
	}

})



;