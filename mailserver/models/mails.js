var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailsSchema = new Schema({
  sender: String, 
  recipients: [String],
  cc: [String],
  text: String,
  mid: String,
  fpath: String,
  bcc: [String],
  to: [String],
  replyto: String,
  ctype: String,
  fname: String,
  date: String,
  folder: String,
  subject: String
});

module.exports = mongoose.model('mails', mailsSchema);
