const Group = require("../models/groupmodel")
const User = require("../models/usermodel");

const send_friendrequest = async (req, res) => {
    const sender = await User.findOne({ username: req.body.sender })
    const reciever = await User.findOne({ username: req.body.reciever })
    const isRequestAlreadyExists = reciever.friend_requests.some(userrequest => userrequest.equals(sender._id))
    const isRequestRecieved = sender.friend_requests.some(userrequest => userrequest.equals(reciever._id))
    const isAlreadyfriends = sender.friends.some(friend => friend.equals(reciever._id))
    if (isAlreadyfriends) {
        res.status(400).send(`You are already friends with ${req.body.reciever}`)
    } else {
        if(req.body.sender===req.body.reciever) {
            res.status(400).send("Cannot send friend request to yourself")
        }else{
            if (!isRequestAlreadyExists && !isRequestRecieved) {
                await User.updateOne({ _id: reciever }, { $push: { friend_requests: sender } })
                res.send(`Request sent to ${req.body.reciever}`)
            }
            else if (isRequestAlreadyExists) {
                res.status(400).send(`Already sent friend request to ${req.body.reciever}`)
            } else if (isRequestRecieved) {
                res.status(400).send(`U already recieved friend request from ${req.body.reciever}`)
            }
        }
        
    }
}

const accept_friend = async (req, res) => {
    const userid = await User.findOne({ username: req.body.username })
    const friendid = await User.findOne({ username: req.body.friend })
    const isRequestExists = userid.friend_requests.some(userrequest => userrequest.equals(friendid._id))
    if (isRequestExists) {
        await User.updateOne({ _id: userid }, { $pull: { friend_requests: friendid._id } })
        await User.updateOne({ _id: friendid }, { $push: { friends: userid._id } })
        await User.updateOne({ _id: userid }, { $push: { friends: friendid._id } })
        res.send(`Accepter friend request of ${req.body.friend}`)
    } else {
        res.status(400).send("Already accepted or does not exist")
    }

}

const reject_friend = async (req, res) => {
    const userid = await User.findOne({ username: req.body.username })
    const friend_requestid = await User.findOne({ username: req.body.friend_request })
    const isRequestExists = userid.friend_requests.some(userrequest => userrequest.equals(friend_requestid._id))
    if (isRequestExists) {
        await User.updateOne({ _id: userid }, { $pull: { friend_requests: friend_requestid._id } })
        res.send(`Rejected friend request of ${req.body.friend_request}`)
    } else {
        res.status(400).send("Already rejected or does not exist")
    }
}

const remove_friend = async (req, res) => {
    const userid = await User.findOne({ username: req.body.username })
    const friendid = await User.findOne({ username: req.body.friend })
    await User.updateOne({ _id: friendid }, { $pull: { friends: userid._id } })
    await User.updateOne({ _id: userid }, { $pull: { friends: friendid._id } })
    res.send(`Removed friend : ${req.body.friend}`)
}

const add_group = async (req, res) => {
    const groupid = await Group.findOne({ Groupname: req.body.groupname })
    const userid = await User.findOne({ username: req.body.username }).populate('groups')
    if (groupid) {
        const isGroupAlreadyPresent = userid.groups.some(userGroup => userGroup._id.equals(groupid._id))
        if (!isGroupAlreadyPresent) {
            await User.updateOne({ _id: userid }, { $push: { groups: groupid._id } })
            await Group.updateOne({ _id: groupid }, { $push: { users: userid._id } })
            res.send(`Joined group ${req.body.groupname}`)
        }
        else {
            res.status(400).send(`Already joined group ${req.body.groupname}`)
        }
    } else {
        res.status(404).send(`No such group present.Create one`)
    }
}

const leave_group = async (req, res) => {
    try {
    const groupid = await Group.findOne({ Groupname: req.body.groupname })
    const userid = await User.findOne({ username: req.body.username }).populate('groups')
    await User.findOneAndUpdate({ _id: userid }, { $pull: { groups: groupid._id } })
    await Group.findOneAndUpdate({ _id: groupid }, { $pull: { users: userid._id } })
    res.send(`you left group ${req.body.groupname}`)
    } catch (error) {
        res.status(400).send(error)
    }
    
}

const getGroups = async (req, res) => {
    let groupnames = []
    if (req.body.characters) {
        const groups = await Group.find({ Groupname: { $regex: `^${req.body.characters}`, $options: 'i' } });
        groupnames = groups.map(group => ({ name: group.Groupname, profile: group.profile}));
        res.send(groupnames)
    }
    else {
        res.send(groupnames)
    }
}

const getUsers = async (req, res) => {
    let usernames = []
    if (req.body.characters) {
        const users = await User.find({ username: { $regex: `^${req.body.characters}`, $options: 'i' } })
        usernames = users.map(user => ({ name: user.username,profile: user.profile}));
        res.send(usernames)
    }
    else {
        res.send(usernames)
    }
}

const get_mycontacts = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
        .populate('friends')
        .populate('groups');
    const friends = user.friends.map(friend => {
        return (
            {
                name: friend.username,
                profile: friend.profile,
                isOnline: friend.socket_id ? true : false
            })
    })
    const groups = user.groups.map(group => ({ name: group.Groupname, profile: group.profile}))
    res.send({ friends: friends, groups: groups })

}

const create_group = async (req, res) => {
    const isGroupAlreadyPresent = await Group.findOne({ Groupname: req.body.groupname })
    if (isGroupAlreadyPresent) {
        res.status(400).send("Group already exists")
    } else {
        const groupnameLength = req.body.groupname.length;
        if (groupnameLength >= 4 && groupnameLength <= 30) {
            let profile;
                if (req.file) {
                    profile = req.file.path
                } else {
                    profile = 'public/groupPictures/default.png';
                }
            const user = await User.findOne({ username: req.body.username })
            const group = await Group.create({ Groupname: req.body.groupname,profile:profile, users: [user._id] })
            await User.updateOne({ username: req.body.username }, { $push: { groups: group._id } })
            res.send(`Group created with name ${req.body.groupname}`)
        }
        else {
            res.status(400).send("Groupname length should be between 4 to 30 characters" )
        }
    }
}

const getFriendrequests = async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).populate('friend_requests')
    const friendrequests = await user.friend_requests.map(friendRequest => ({ name: friendRequest.username,profile:friendRequest.profile }))
    res.send(friendrequests)
}

module.exports = { send_friendrequest, accept_friend, reject_friend, remove_friend, add_group, leave_group, getGroups, getUsers, get_mycontacts, create_group, getFriendrequests }

