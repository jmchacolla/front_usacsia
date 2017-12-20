'use strict';

angular.module("adminApp")
.controller('LoginCtrl', function (authUser) {
	var vm = this;
	vm.loginForm = {
	usu_nick: '2281171',
	password: '2281171'
	};

	vm.login = function(){
		authUser.loginApi(vm.loginForm);
	}

})



;