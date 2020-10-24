import React, {forwardRef } from 'react'
import { Avatar } from '@material-ui/core';
import './Message.css';
import axios from '../../../axois';
import {useSelector} from 'react-redux'
import {selectChatName, selectChatId} from '../../../features/chatSlice';
import {selectUser} from '../../../features/userSlice';
const Message =forwardRef (
  (  {_id,sender, message, timestamp}, ref 
  )=> {
 const user= useSelector(selectUser)
 var time = new Date(timestamp).toDateString();

    return (
        <React.Fragment>
             <div ref={ref}  className={`message ${user.email === sender.email && "message__sender"}`}>
               <Avatar src={sender.photos} />
                <p>{message}</p>
                <small> {time}</small>
                </div>
       
        </React.Fragment>
       
        
    )
}
);


export default Message
