import axios from 'axios';
// const baseURL = 'http://localhost:3001/persons';
const baseURL = '/api/persons'


const addPerson = async (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const getPersons = async () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const updatePersonNumber = async (id, updatedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request.then(response => response.data)
}


const deletePerson = async (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}


export default { getPersons, addPerson, updatePersonNumber, deletePerson };
