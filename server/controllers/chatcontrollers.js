const Group = require('../models/groupmodel');
const Messages = require('../models/messagemodel')
const User = require('../models/usermodel')
const { formatTimestamp } = require('../utils/timestamp');

const get_Messages = async (req, res) => {
    if (req.body.type == "friends") {
        const user1 = await User.findOne({ username: req.body.username });
        const user2 = await User.findOne({ username: req.body.chatname });
        const messages = await Messages.find({ $or: [{ sender: user1._id, reciever: user2._id }, { reciever: user1._id, sender: user2._id }] }).populate("sender")
        const rearrange_messages = messages.map((message) => {
            return {
                key: message._id,
                username: {name:message.sender.username,profile:message.sender.profile},
                message: message.message,
                image: message.image,
                timestamp: formatTimestamp(message.createdAt)
            }
        })
        res.send(rearrange_messages)
    }
    else if (req.body.type == "groups") {
        const group = await Group.findOne({ Groupname: req.body.chatname });
        const messages = await Messages.find({ group: group._id }).populate("sender")
        const rearrange_messages = messages.map((message) => {
            return {
                key: message._id,
                username: {name:message.sender.username,profile:message.sender.profile},
                message: message.message,
                image:message.image,
                timestamp: formatTimestamp(message.createdAt)
            }
        })
        res.send(rearrange_messages)
    }
}

const send_Message = async (req, res) => {
   const image=  req.file?req.file.path:""
    if (req.body.type === "friends") {
        const sender = await User.findOne({ username: req.body.username })
        const reciever = await User.findOne({ username: req.body.chatname })
        const message = await Messages.create({
            message: req.body.message,
            sender: sender._id,
            reciever: reciever._id,
            image:image
        })
        const rearrange_message={
            key: message._id,
            username:{name:sender.username,profile:sender.profile},
            message: message.message,
            image:message.image,
            timestamp: formatTimestamp(message.createdAt)
        }
        res.send(rearrange_message)

    } else if (req.body.type === "groups") {
        const sender = await User.findOne({ username: req.body.username })
        const group = await Group.findOne({ Groupname: req.body.chatname })
       const message = await Messages.create({
            message: req.body.message,
            sender: sender._id,
            group: group._id,
            image:image
        })
        const rearrange_message={
            key: message._id,
            username:{name:sender.username,profile:sender.profile},
            message: message.message,
            image:message.image,
            timestamp: formatTimestamp(message.createdAt)
        }
    res.send(rearrange_message)
    }
}

module.exports = { get_Messages, send_Message }