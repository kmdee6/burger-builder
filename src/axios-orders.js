import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-64656.firebaseio.com/'
});

export default instance;