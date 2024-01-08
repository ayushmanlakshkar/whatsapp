const mongoose = require('mongoose');

const groupschema = new mongoose.Schema({
    Groupname: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
        minlength: 4
    },
    profile:{
        type: String
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',sparse: true,
    index: true,}]
});

const Group = mongoose.model('Group', groupschema);

module.exports = Group;
