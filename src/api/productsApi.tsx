import axios from "axios";

const baseURL = 'https://eacz-cafe-rn.herokuapp.com/api'

const productsApi = axios.create({baseURL})


export default productsApi;