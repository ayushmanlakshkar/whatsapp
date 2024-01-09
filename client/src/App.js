import './App.css';
import { useEffect } from 'react';
import { connect_socket } from './socket-connection/socket';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Authentication from './components/Authentication';
import Chats from './components/Chats';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

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
