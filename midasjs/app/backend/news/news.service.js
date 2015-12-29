'use strict'

angular.module('midasApp').factory('Newss', function(Restangular){
	return Restangular.service('news');
});