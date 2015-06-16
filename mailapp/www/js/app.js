// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app=angular.module('mailApp', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.factory('factoryMail', function($http) {
  return {
    getFolders: function() {
      return $http.get('http://localhost:3000/mailapi/folders');
    },
    //Get mails by folder
    getByFolder: function(folder) {
      return $http.get('http://localhost:3000/mailapi/shbyfolder/' + folder);
    },
    //Get mail by _id
    getMail: function(mail) {
      return $http.get('http://localhost:3000/mailapi/show/' + mail._id);
    },
    //Delete mail by _id
    deleteMail: function(mail) {
      return $http.delete('http://localhost:3000/mailapi/deletemail/' + mail._id);
    },
    //Delete folder by foldername
    deleteFolder: function(folder) {
      return $http.delete('http://localhost:3000/mailapi/deletefolder/' + folder);
    },
    //Rename folder by foldername
    renameFolder: function(folder, newName) {
      return $http.put('http://localhost:3000/mailapi/updfoldername/' + folder, {folder: newName});
    },
    //Move mail by foldername
    moveMail: function(mail, newName) {
      return $http.put('/mailapi/movemail/' + mail._id, {folder: newName});
    },
    //Create new mail
    newMail: function(mail) {
      var recipients = mail.rec.split(';');
      var paras = {
        sender: mail.sender,
        recipients: recipients,
        text: mail.text,
        subject: mail.subject,
        date: mail.date,
        folder: mail.folder
      };
      console.log("create mail:" );
      console.log(paras);
      return $http.post('/mailapi/createmail', paras);
    }
  };
});