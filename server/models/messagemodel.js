const mongoose = require('mongoose');

const messageschema = new mongoose.Schema({
message:{
  type:String,
  default:''
},
image:{
 type:String,
 default:''
},
sender:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
group:{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
  
},{timestamps:true}
);

const Message = mongoose.model('Message', messageschema);

module.exports = Message;
