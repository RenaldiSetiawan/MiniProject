import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/orders`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}


const create = async (orders) => {
    await axios.post(`/api/orders/ord`, orders).then(response => { return response })
        .catch(error => { return error.message })
}

const remove = async (data) => {
    const order_name = parseInt(data);
    try {
        let response = await axios.delete(`/api/orders/${order_name}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default {
    list,
    create,
    remove
}