var app = angular.module("mailApp", ['ui.bootstrap']);

app.factory('factoryMail', function($http) {
	return {
		getFolders: function() {
			return $http.get('/mailapi/folders');
		},
		//Get mails by folder
		getByFolder: function(folder) {
			return $http.get('mailapi/shbyfolder/' + folder);
		},
		//Get mail by _id
		getMail: function(mail) {
			return $http.get('mailapi/show/' + mail._id);
		},
		//Delete mail by _id
		deleteMail: function(mail) {
			return $http.delete('mailapi/deletemail/' + mail._id);
		},
		//Delete folder by foldername
		deleteFolder: function(folder) {
			return $http.delete('/mailapi/deletefolder/' + folder);
		},
		//Rename folder by foldername
		renameFolder: function(folder, newName) {
			return $http.put('/mailapi/updfoldername/' + folder, {folder: newName});
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