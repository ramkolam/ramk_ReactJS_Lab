import axios from "axios"

const getExpense = () => {

    return axios.get('http://localhost:8000/expenses')
        .then(response => response.data)
}

const postExpense = (newExpense) => {

    return axios.post("http://localhost:8000/expenses", newExpense, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.data)
}

export {
    getExpense,
    postExpense
}