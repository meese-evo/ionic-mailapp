var Mails = require('../models/mails');
var express = require('express');
var router = express.Router();

/* GET test page. */
/*
router.get('/', function(req, res, next) {
  res.render('test', { title: 'FUCKING TESTPAGE' });
});
*/

// Show all folders
router.route('/folders').get(function(req, res){
  console.log("Requesting Destinct Folders");
  Mails.distinct('folder',function(err, mails){
    if (err){
      return res.send(err);
    }

    res.json(mails);
  });
});

// Show specifics to a mail
// Example id: 555343d9cf3dedf50aaa66db
router.route('/show/:id').get(function(req, res){
  console.log("Requesting mail " + req.params.id);
  Mails.find({"_id" : req.params.id},
           //{"sender" : 1, "recipients" : 1, "date" : 1, "subject" : 1},
           function(err, mail){
             if (err){
               return res.send(err);
             }
             res.json(mail);
           });
});

//Show mails by folder
router.route('/shbyfolder/:id').get(function(req, res){
  console.log("Show Mails by Folder: " + req.params.id);
  Mails.find({folder:req.params.id},function(err, mails){
    if (err){
      return res.send(err);
    }
    res.json(mails);
  });
});

// Get count of messages in folder
router.route('/count/:id').get(function(req, res){
  console.log("Count Mails in Folder: " + req.params.id);
  Mails.count({folder:req.params.id},function(err, mails){
    if (err){
      return res.send(err);
    }
    res.json(mails);
  });
});

// Deletes specific mail
router.route('/deletemail/:id').delete(function(req, res){
  console.log("Deleting mail " + req.params.id);
  Mails.remove({"_id" : req.params.id}, function(err, mail){
    if (err){
      return res.send(err);
    }
    res.json(mail);
  });
});

// Creates a mail
router.route('/createmail/').post(function(req, res){
  console.log("Creating mail");
  var m = new Mails();
  m.sender = req.body.sender;
  m.recipients = req.body.recipients;
  m.text = req.body.text;
  m.subject = req.body.subject;
  m.date = new Date();
  m.folder = "new";
  console.log("req.body.s: " + req.body.s);
  console.log(m);
  m.save(function(err) {
    if (err){
      return res.send(err);
    }
  });

  res.send("Saved");
});

// Move Mail
router.route('/movemail/:id').put(function(req, res) {
  var id = req.params.id;
  var new_folder = req.body.folder;
  console.log("Moving " + id + " to " + new_folder);
  Mails.update({"_id" : id}, {$set : {"folder" : new_folder}},
             function(err, mail) {
               if (err) {
                 return res.send("didn't find");
               }
               res.json({message : "Moved successfully"});
             });
});


// Delete a folder
router.route('/deletefolder/:id').delete(function(req, res){
  Mails.remove({
    folder: req.params.id
  },function(err, mails){
      if(err){
        return res.send(err);
      }
      res.json({message:"Successfully deleted"});
    });
});

// Update folder name
router.route('/updfoldername/:id').put(function(req, res){
  var oldname = req.params.id;
  var newname = req.body.folder;
  console.log("Renaming " + oldname + " to " + newname);
  Mails.update({folder : oldname}, {$set : {folder : newname}}, {multi : true},
               function(err, mails) {
                 if(err){
                   return res.send(err);
                 }
                 res.json({message:"Successfully renamed"});
               });
// res.json({message:"Successfully renamed"});
});

module.exports = router;
