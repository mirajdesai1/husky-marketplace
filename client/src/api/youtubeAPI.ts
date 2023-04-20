import axios from 'axios';

const API_KEY = 'AIzaSyBZGZI5zb2wc1YdG70Bdhi092kcBbzndFk';

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 20,
        key: API_KEY
    },
    headers: {}
})