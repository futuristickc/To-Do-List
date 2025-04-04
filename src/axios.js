import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  // headers: {
    //   'Authorization': `Bearer ${token}`, 
    // }
  });
  
  
  axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// axiosInstance.get('todos')
//   .then(response => {
//     console.log('Todos fetched:', response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching todos:', error);
//   });

export default axiosInstance;