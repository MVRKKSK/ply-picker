import axios from "axios"

export const getProducts = (sortBy) => {
    return axios.get(`http://localhost:5000/api/products?sortBy=${sortBy}&order=desc&limit=30`).then((response) => {
        return response.data;
    }).catch(error => {
        console.log(error)
    })
}
