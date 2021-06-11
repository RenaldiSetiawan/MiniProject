import axios from "axios"

const signin = async (user) => {
  try {
    let response = await axios.post(`/api/users/signin`, user)
    return await response.data
  } catch (error) {
    return await error.response.data
  }
}

const signout = async () => {
  try {
    const result = await axios.get(`/api/users/signout`)
    return await result.data
  } catch (err) {
    console.log(err)
  }
}

const signup = async () => {
  try {
    const result = await axios.post(`/api/users/signup`)
    return await result.data
  } catch (err) {
    console.log(err)
  }
}

const list = async () => {
  try {
    let response = await axios.get(`/api/users`)
    return await result.data
  } catch (error) {
    return await err.message
  }
}

export {
  signin,
  signout,
  signup,
  list
}