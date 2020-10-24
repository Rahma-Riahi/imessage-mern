import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SideBarOption.css';
import axois from '../../../axois';
import {useDispatch } from 'react-redux';
import {setChat} from '../../../features/chatSlice';
import * as timeago from "timeago.js";
import Pusher from 'pusher-js';
const pusher = new Pusher('360287e2dc9fc0fad3a2', {
    cluster: 'eu'
  });
function SidebarOption({id , name}) {

  const [lastMessage, setLastMessage] = useState('');
  const [lastPhoto, setLastPhoto] = useState('');
  const [lastTimestamp , setLastTimestamp] = useState(new Date());

  const dispatch = useDispatch();
  
   const getSidebarElement = ()=>{
    axois.get(`/get/lastMessage?id=${id}`)
    .then((res)=>{
        console.log('get side bar elemenet',res.data)
        setLastMessage(res.data.message);
        setLastPhoto(res.data.user.photos);
        setLastTimestamp(res.data.timestamp)
    }).catch(err=>console.log(err))
   
   }

   useEffect(()=>{
       getSidebarElement();
      const channel = pusher.subscribe('messages');
      channel.bind('newMessage', function(data){
        getSidebarElement(); 
      })
   },[id])
    return (
        <div 
        onClick={()=> {
            dispatch(
                setChat (
                    {
                        chatId:id,
                        chatName: name
                    }
                ),
               
            )
        }}
        className='sidebarOption'>
            <Avatar src={lastPhoto} />
            <div className='sidebarOption__info'>
                 <h3>{name} </h3>
                 <p>{lastMessage} </p>
                 <small>
                 {timeago.format(lastTimestamp)}{" "}
                 </small>
            </div>
        </div>
    )
}

export default SidebarOption
