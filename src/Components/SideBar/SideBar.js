import { Avatar, IconButton } from '@material-ui/core'
import React, {useEffect, useState} from 'react';
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SidebarOption from './SidebarOption/SidebarOption';
import axios from '../../axois';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, logout} from '../../features/userSlice';
import './SideBar.css';
import Pusher from 'pusher-js';

var pusher = new Pusher('360287e2dc9fc0fad3a2', {
    cluster: 'eu'
  });
function SideBar(props) {
const [chats, setChats] = useState([]);
const user= useSelector(selectUser);
const dispatch = useDispatch();
 
   const getChat = () => {
    axios.get('/get/converstationList').then(result =>  { 
      setChats(result.data);
      console.log(result.data)
    }).catch(err=> console.log(err));
   }
  useEffect(()=>{
    getChat();
    const channel = pusher.subscribe('chats')
     channel.bind('newChat', function(data) {
       getChat();
     })
  }, []);
  const addChat = () => {
    const chat = prompt('Please enter chat name');
    const firstMessage = prompt('Please send the first message');

    if(chat && firstMessage ){
      let chatId=''
      axios.post('/new/conversation',{
        chatName: chat
      }).then((res)=>{
        chatId = res.data._id
      }).then(()=>{
        axios.post(`/new/message?id=${chatId}`,{
          message: firstMessage,
          timestamp: Date.now(),
          user:user
        })
      })
    }
  }
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                  <Avatar
                   src={user?.photos}
                   onClick={()=>{
                     dispatch(logout());
                  
                   }}
                  />
                  <div className='sidebar__search'>
                  <SearchIcon />
                  <input placeholder="Search Room" />
                  </div>
                  <IconButton
                    variant="outlined"
                    onClick={addChat}
                    className="sidebar__inputButton"
                    >
                    <RateReviewIcon />
                 </IconButton>
            </div>
            <div className='sidebar__chats'>
              { chats.map(({id , name})=>
              <SidebarOption  key={id} id={id} name={name}  />
                )
              }  
            
            </div>
        </div>
    )
}

export default SideBar
