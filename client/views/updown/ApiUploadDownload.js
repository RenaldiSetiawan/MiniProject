import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/updown`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default {
    list
}