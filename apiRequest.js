import Axios from 'axios';

// Axios.defaults.baseURL = 'http://localhost:3000/api/';
// Axios.defaults.baseURL = 'https://5afe1bf2d0cc5b001479bf09.mockapi.io/api/v1/';
// Axios.defaults.headers.common['Accept'] = 'application/json';
// Axios.defaults.headers.post['Content-Type'] = 'application/json';


export default Axios.create({
    baseURL: 'https://5afe1bf2d0cc5b001479bf09.mockapi.io/api/v1/'
});