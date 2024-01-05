import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect_socket } from './socket-connection/socket';
import Authentication from './components/Authentication';
import Chats from './components/Chats';

function App() {
 const islogged = useSelector(state => state.islogged.status);
 useEffect(() =>{
   connect_socket()
 })
  return (
    <div className='app'>
       {islogged?<Chats/>:<Authentication/>}
    </div>  
    );
}

export default App;
