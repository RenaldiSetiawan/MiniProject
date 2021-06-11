import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/tours_images/`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (tours_images) => {
    await axios.post(`/api/tours_images/multipart`, tours_images).then(response => { return response })
        .catch(error => { return error.message })
}

const findOne = async (data) => {
    const toim_id = parseInt(data);
    try {
        let response = await axios.get(`/api/tours_images/${toim_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const update = async (tours_images) => {
    const toim_id = parseInt(tours_images.toim_id);
    try {
        let response = await axios.put(`/api/tours_images/${toim_id}`,
            tours_images)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const remove = async (data) => {
    const toim_id = parseInt(data);
    try {
        let response = await axios.delete(`/api/tours-_images/${toim_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default {
    list,
    create,
    remove,
    findOne,
    update
}