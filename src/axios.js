import axios from 'axios';

const token = localStorage.getItem('authToken');


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5173/api/',
  headers: {
    'Authorization': `Bearer ${token}`, 
  }
});


axiosInstance.get('todos')
  .then(response => {
    console.log('Todos fetched:', response.data);
  })
  .catch(error => {
    console.error('Error fetching todos:', error);
  });