import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/line_items`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}


const create = async (lineitems) => {
    await axios.post(`/api/line_items/item`, lineitems).then(response => { return response })
        .catch(error => { return error.message })
}


export default {
    list,
    create
}