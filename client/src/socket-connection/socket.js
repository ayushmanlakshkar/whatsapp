import  io  from "socket.io-client"
const socket = io.connect('http://localhost:3001')

const connect_socket = ()=>{
    socket.on("connect",(s)=> {
        console.log("connected on client")
    })
}

export {socket, connect_socket};