import axios from 'axios';
const instance = axios.create({
    baseURL:'https://my-burger-app-455ac.firebaseio.com/'
})

export default instance;