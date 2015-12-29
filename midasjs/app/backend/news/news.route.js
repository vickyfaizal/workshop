'use strict'

angular.module('midasApp').config(function($stateProvider){
	$stateProvider.state('backend.news', {
		url: '/backend/news',
		templateUrl: 'backend/news/news.html',
		controller: 'NewsCtrl'
	});
});