app.controller('MainController', function($scope){
  $scope.title = 'MEAN WebMail Application';
});

app.controller('controllerMail', function($scope, $http, factoryMail) {
  //Testing the scope!
  $scope.title = 'Follow the White Rabbit';

  //Get folders from Database
  factoryMail.getFolders().success(function(data) {
    $scope.folders = data;
    // console.log("controllerMail.factoryMail.getFolders() "+data[0]);
    // $scope.folders=data;
    // console.log(data);
    }).error(function(data, status) {
      console.log("error: " ,data, status);
      $scope.folders = [];
  });

  $scope.selectFolder = function(folder) {
    $scope.selectedFolder = folder;
    console.log("controllerMail.selectfolder: "+$scope.selectedFolder);
    factoryMail.getByFolder(folder).success(function (data) {
      $scope.mails = data;
    })
  };

  //Get mails by folder
  // factoryMail.getByFolder().success(function(data){
  //   $scope.mails = data;
  //     }).error(function(data, status) {
  //       console.log("error: " ,data, status);
  //       $scope.folders = [];
  //     }); 
  //   }).error(function(data, status) {
  // });

  // //Get mail by _id
  // factoryMail.getMail().success(function(data){

  // }).error(function(data, status) {

  // });

  // //Delete mail by _id
  // factoryMail.deleteMail().success(function(data){

  // }).error(function(data, status) {

  // });

  // //Delete folder by foldername
  // factoryMail.deleteFolder().success(function(data){

  // }).error(function(data, status) {

  // });

  //Rename folder
  // factoryMail.renameFolder().success(function(data){

  // }).error(function(data, status) {

  // });

  // // //Move folder by foldername
  // factoryMail.moveMail().success(function(data){

  // }).error(function(data, status) {

  // })

  // //Create new mail
  // factoryMail.newMail().success(function(data){

  // }).error(function(data, status) {

  // });
});

app.controller('controllerMailTabs', function($scope, $window){
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];
});

app.controller('controllerAccordion', function($scope, $http, factoryMail) {

  // $scope.groups = [
  //   {
  //     title: 'Dynamic Group Header - 1',
  //     content: 'Dynamic Group Body - 1'
  //   },
  //   {
  //     title: 'Dynamic Group Header - 2',
  //     content: 'Dynamic Group Body - 2'
  //   }
  // ];

  factoryMail.getFolders().success(function(data) {
    $scope.folders = data;
  });

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];
 
  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };


});
