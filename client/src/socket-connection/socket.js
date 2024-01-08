import  io  from "socket.io-client"
const socket = io.connect('http://localhost:3001')

const connect_socket = ()=>{
    socket.on("connect",(s)=> {
        console.log("Welcome To Whatsapp Clone")
    })
}

export {socket, connect_socket};