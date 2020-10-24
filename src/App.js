import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import Login from './Pages/Login/Login';
import Imessage from './Pages/IMessage/Imessage';
import {useSelector} from 'react-redux';
import {selectUser} from './features/userSlice';

function App() {
    const user = useSelector(selectUser);
    useEffect(()=>{
      sessionStorage.setItem('userData',JSON.stringify(user) );
    },[user])
  return (
    <div className="App">
    
   {user? <Imessage/> : <Login/> }
      
    </div>
  );
}

export default App;
