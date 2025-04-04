import axios from 'axios';

const token = localStorage.getItem('authToken');

// Create an Axios instance with the token in the Authorization header
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5173/api/',
  headers: {
    'Authorization': `Bearer ${token}`, // Attach token to the header
  }
});

// Use the axiosInstance to make requests
axiosInstance.get('todos')
  .then(response => {
    console.log('Todos fetched:', response.data);
  })
  .catch(error => {
    console.error('Error fetching todos:', error);
  });