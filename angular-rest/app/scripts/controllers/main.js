'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, Restangular) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.news;
    $scope.newss;

    var newsRest = Restangular.all('news');

    $scope.search = function(keywords) {
      console.log("keywords :"+keywords);
      newsRest.getList({title:keywords}).then(function(newss){
        $scope.newss = newss;
      });
    }

    $scope.search();

    var success = function(s) {
      console.log(s);
      $scope.search();
    }

    var error = function(){
      console.log("error")
    }

    $scope.submit = function(news) {
      console.log("post :"+news);
      newsRest.post(news).then(success, error);
    }

  });
