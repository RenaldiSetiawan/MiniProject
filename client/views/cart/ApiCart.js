import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/tours_cart`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (tourcart) => {
    await axios.post(`/api/tours_cart`, tourcart).then(response => { return response })
        .catch(error => { return error.message })
}

const findOne = async (data) => {
    const toca_id = parseInt(data);
    try {
        let response = await axios.get(`/api/tours_cart/${toca_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const update = async (tourcart) => {
    const toca_id = parseInt(tourcart.toca_id);
    try {
        let response = await axios.put(`/api/tours_cart/${toca_id}`,
            tourcart)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const remove = async (data) => {
    const toca_id = parseInt(data);
    try {
        let response = await axios.delete(`/api/tours_cart/${toca_id}`)
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