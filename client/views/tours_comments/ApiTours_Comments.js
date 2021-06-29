import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/tours_comments`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (tours_comments) => {
    await axios.post(`/api/tours_comments`, tours_comments).then(response => { return response })
        .catch(error => { return error.message })
}

const findOne = async (data) => {
    const toco_id = parseInt(data);
    try {
        let response = await axios.get(`/api/tours_comments/${toco_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const remove = async (data) => {
    const toco_id = parseInt(data);
    try {
        let response = await axios.delete(`/api/tours_comments/${tour_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default {
    list,
    create,
    remove,
    findOne
}