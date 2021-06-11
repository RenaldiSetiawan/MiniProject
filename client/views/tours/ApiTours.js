import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/tours`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (tour) => {
    await axios.post(`/api/tours`, tour).then(response => { return response })
        .catch(error => { return error.message })
}

const findOne = async (data) => {
    const tour_id = parseInt(data);
    try {
        let response = await axios.get(`/api/tours/${tour_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const update = async (tour) => {
    const tour_id = parseInt(tour.tour_id);
    try {
        let response = await axios.put(`/api/tours/${tour_id}`,
            tour)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const remove = async (data) => {
    const tour_id = parseInt(data);
    try {
        let response = await axios.delete(`/api/tours/${tour_id}`)
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