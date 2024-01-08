import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect_socket } from './socket-connection/socket';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Authentication from './components/Authentication';
import Chats from './components/Chats';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Check from './components/Check';

function App() {
 const islogged = useSelector(state => state.islogged.status);

 useEffect(() =>{
   connect_socket()
 })

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Authentication />} />
          <Route path='/:username' element={<ProtectedRoute path='/:username' Component={<Chats />} />} />
          {/* <Route path='/check' element={<Check/>}/> */}
        </Routes>
      </Router>
    </div>  
    );
}

export default App;
