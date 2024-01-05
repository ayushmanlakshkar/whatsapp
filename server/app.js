const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const User = require('./models/usermodel')
const Group = require('./models/groupmodel')
const Message = require('./models/messagemodel')

const dotenv = require('dotenv');
const cors = require('cors');
const authroutes = require('./routes/authroutes')
const contactroutes = require('./routes/contactroutes')
const chatroutes = require('./routes/chatroutes');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    socket.on('user_login', async (req) => {
        await User.updateOne({ username: req.username }, { socket_id: socket.id })
        console.log('user logged in')

    })

    socket.on("user_online", async (req) => {
        const friends_of_user = await User.findOne({ username: req.username }).populate('friends')
        friends_of_user.friends.forEach(friend => {
            if(friend.socket_id){
                socket.to(friend.socket_id).emit("user_online",{user:req.username})
            }
        })
    })

    socket.on("send_friend_request", async (req) => {
        const reciever_socket = await User.findOne({ username: req.reciever })
        socket.to(reciever_socket.socket_id).emit("refresh_friend_requests", `${req.sender}: sent u a request`)
    })

    socket.on("accept_reject_friend", async (req) => {
        const friend_socket = await User.findOne({ username: req.friend })
        const user_socket = await User.findOne({ username: req.username })
        console.log(req)
        if (user_socket.socket_id) {
            console.log(user_socket.socket_id)
            socket.emit("refresh_friend_requests", `U just ${req.acceptance ? "accepted" : "rejected"} ${req.friend}'s request `)
        }
        if (friend_socket.socket_id) {
            if (req.acceptance) {
                socket.to(friend_socket.socket_id).emit("refresh_friends", `${req.username} just accepted ur friend requestf`)
            }
        }
    })


    socket.on("send_message", async (req) => {
        if (req.type === "friends") {
            const reciever = await User.findOne({ username: req.reciever })
            if (reciever.socket_id) {
                socket.to(reciever.socket_id).emit("send_message", req)
            }
        }
        else if (req.type === "groups") {
            // const reciever = await Group.findOne({ Groupname: req.reciever })
            // socket.broadcast.to(reciever)
        }
    })
    socket.on("typing", async (req) => {
        const reciever = await User.findOne({ username: req.reciever })
        if (reciever.socket_id) {
            socket.to(reciever.socket_id).emit("typing", req)
        }
    })
    socket.on("stopped_typing", async (req) => {
        const reciever = await User.findOne({ username: req.reciever })
        if (reciever.socket_id) {
            socket.to(reciever.socket_id).emit("stopped_typing", req)
        }
    })
    socket.on('disconnect', async () => {
        const user = await User.findOne({ socket_id: socket.id })
        if (user) {
            const newu = await User.findOneAndUpdate({ socket_id: socket.id }, { socket_id: "" })
            const user_friends = await user.populate('friends')
            user_friends.friends.forEach((friend)=>{
                if(friend.socket_id){
                    socket.to(friend.socket_id).emit("user_offline",{user:user.username})
                }
            })
        }

    })

});


app.use('/auth', authroutes);
app.use('/contact', contactroutes);
app.use('/chats', chatroutes);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(process.env.PORT || 3001, () => {
            console.log('Server is running on port ' + (process.env.PORT || 3001));
        });

    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });
