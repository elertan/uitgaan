import Axios from 'axios';

// Axios.defaults.baseURL = 'http://localhost:3000/api/';
// Axios.defaults.baseURL = 'https://5afe1bf2d0cc5b001479bf09.mockapi.io/api/v1/';
// Axios.defaults.headers.common['Accept'] = 'application/json';
// Axios.defaults.headers.post['Content-Type'] = 'application/json';

class ApiRequest {
    axios;
    setAccessToken = (token) => {
        this.axios = Axios.create({
            baseURL: 'https://uitgaan-api.herokuapp.com/api/v1/',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }

    removeAccessToken = () => {
        this.axios = Axios.create({
            baseURL: 'https://uitgaan-api.herokuapp.com/api/v1/',
        });
    }

    static getInstance() {
        if (ApiRequest._instance) {
            return ApiRequest._instance;
        }
        ApiRequest._instance = new ApiRequest();
        ApiRequest._instance.axios = Axios.create({
            baseURL: 'https://uitgaan-api.herokuapp.com/api/v1/'
        });
        return ApiRequest._instance;
    }
}

export default ApiRequest;

// export default Axios.create({
//     baseURL: 'http://localhost:3000/api/v1/'
// });