'use strict'

angular.module('midasApp').controller('NewsCtrl', function($scope, $modal, $location, Newss, angularPopupBoxes){
	$scope.searchParams = $location.search();
	$scope.searchParams.hash = 0;
	$scope.page = 1;

	$scope.search = function() {
		$scope.searchParams.hash++;
		$scope.searchParams.page = $scope.page - 1;

		$location.search($scope.searchParams);

		Newss.getList($scope.searchParams).then(function(newss){
			$scope.newss = newss;
			// $scope.page = newss.meta.number +1;
		});
	};

	$scope.search();

	$scope.openForm = function(news) {
		var modal = $modal.open({
			templateUrl: 'news.form.html',
			controller: 'NewsFormCtrl',
			size: 'lg',
			resolve: {
				news: function() {
					return news;
				}
			}
		});

		modal.result.then(function(n){
			$scope.searchParams.q = n.title;
			$scope.search();
		});
	};

	$scope.remove = function(news) {
		angularPopupBoxes.confirm('Apakah Anda yakin untuk menghapus data ini?').result.then(function(){
			news.remove().then(function(){
				$scope.search();
			});
		});
	};
}).controller('NewsFormCtrl', function($scope, $modalInstance, $validation, Newss, news){
	if (news) {
		$scope.news = news;
	}

	var success = function(n) {
		$modalInstance.close(n);
	};

	var error = function() {
		$scope.error = true;
	};

	$scope.submit = function(news, form) {
		$validation.validate(form).success(function(){
			$scope.error = false;

			if (news.id) {
				news.put().then(success, error);
			} else {
				Newss.post(news).then(success, error);
			}
		});
	};
});