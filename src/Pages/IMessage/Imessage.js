import React from 'react'
import Chat from '../../Components/Chat/Chat';
import SideBar from '../../Components/SideBar/SideBar';
import './Imessage.css';
function Imessage() {
    return (
        <div className='imessage'>
        <SideBar/>
        <Chat/>
        </div>
    )
}

export default Imessage
