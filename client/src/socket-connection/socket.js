import  io  from "socket.io-client"
import { BASE_URL } from "../services/Api"
const socket = io.connect(BASE_URL)

const connect_socket = ()=>{
    socket.on("connect",(s)=> {
        console.log("Welcome To Whatsapp Clone")
    })
}

export {socket, connect_socket};