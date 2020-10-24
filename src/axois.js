import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://imessage-clone1.herokuapp.com/'
});
export default instance;