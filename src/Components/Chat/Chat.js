import { Avatar , IconButton} from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import Message from './Messages/Message';
import React ,{useEffect, useState} from 'react';
import axios from '../../axois';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/userSlice';
import FlipMove from "react-flip-move";
import {selectChatName, selectChatId} from '../../features/chatSlice';
import './Chat.css';
import Pusher from 'pusher-js';

var pusher = new Pusher('360287e2dc9fc0fad3a2', {
    cluster: 'eu'
  });
function Chat() {
    const [input,setInput] = useState('')
    const [messages, setMessages]= useState([])
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const user= useSelector(selectUser);

     const getConversation = (chatId) =>{
        axios.get(`/get/conversation?id=${chatId}`)
        .then(result=>(
            console.log(result.data[0].conversation),
            setMessages(result.data[0].conversation)))
        .catch(err => console.log(err))
     }
    useEffect(()=>{
       pusher.unsubscribe('messages');
        getConversation(chatId);
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function(data){
            getConversation(chatId); 
        })
     },[chatId]);
       
     const sendMessage = (e) =>{
         e.preventDefault();
         console.log('send message')
        axios.post(`/new/message?id=${chatId}`,{
             message: input,
             timestamp: Date.now(),
             user:user
         });
         setInput('');
     }

    return (
        <div className='chat'>
            {/** HeADER */}
            <div className='chat__header'>
               <h4>
                   To : <span className="chat__name"> {chatName} </span>
               </h4>
               <strong>Details </strong>
            </div>
            {/** MESSages */}
            <div className='chat__messages'>
                <FlipMove>
                   {messages.map(({user, _id, message, timestamp})=>
                   <Message key={_id} id={_id} sender={user} message={message} timestamp={timestamp}  />  
                )}
                </FlipMove>
             
              
            </div>
            {/** input */}
            <div className='chat__input'>
               <form className='chat__form'> 
               <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="iMessage"
          />

          <button onClick={sendMessage}> Send message</button>
               </form>
               <IconButton>
               <MicNoneIcon className="chat__mic" />
             </IconButton>
            </div>
        </div>
    )
}

export default Chat 
