'use strict';

angular.module('yamaApp').controller('ApplicationCtrl', function ($scope, $modal, $location, Applications, angularPopupBoxes) {
	$scope.searchParams = $location.search();
	$scope.searchParams.hash = 0;
	$scope.page = 1;

	// Search form submitted or page changed
	$scope.search = function() {
		$scope.searchParams.hash++;
		$scope.searchParams.page = $scope.page - 1;

		$location.search($scope.searchParams);

		// Load list on page loaded
		Applications.getList($scope.searchParams).then(function(applications) {
			$scope.applications = applications;
			$scope.page = applications.meta.number + 1;
		});
	};

	$scope.search();

	// ID clicked, open popup form dialog
	$scope.openForm = function(application, changeSecret) {
		var modal = $modal.open({
			templateUrl: 'application.form.html',
			controller: 'ApplicationFormCtrl',
			size: 'lg',
			resolve: {
				application: function() {
					return application;
				},
				changeSecret: function() {
					return changeSecret;
				}
			}
		});

		modal.result.then(function(a) {
			$scope.searchParams.q = a.displayName;
			$scope.search();
		});
	};

	// Open popup confirmation and delete user if user choose yes
	$scope.remove = function(application) {
		angularPopupBoxes.confirm('Are you sure want to delete this data?').result.then(function() {
			application.remove().then(function() {
				$scope.search();
			});
		});
	};
}).controller('ApplicationFormCtrl', function($scope, $modalInstance, $validation, Applications, application, changeSecret) {
	$scope.changeSecret = changeSecret || false;

	if (application) {
		application.redirectUri = application.registeredRedirectUris[0];
		$scope.application = application;
	}

	var success = function(a) {
		$modalInstance.close(a);
	};

	var error = function() {
		$scope.error = true;
	};

	$scope.submit = function(application, form) {
		$validation.validate(form).success(function() {
			application.registeredRedirectUris = [];
			application.registeredRedirectUris.push(application.redirectUri);

			$scope.error = false;

			if (application.id) {
				application.put().then(success, error);
			} else {
				Applications.post(application).then(success, error);
			}
		});
	};

	$scope.generateSecret = function(application) {
		application.post('secret').then(function(a) {
			$scope.application.secret = a.secret;
		}, error);
	};
});
