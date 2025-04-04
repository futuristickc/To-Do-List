<template>
  <b-container class="d-flex justify-content-center align-items-center vh-100">
    <b-card class="w-100" style="max-width: 500px; border-radius: 10px;">
      <b-card-title class="text-center mb-4">Login</b-card-title>
      <b-card-body>
        <b-form @submit.prevent="loginUser">
          <b-form-group label="Email" label-for="email">
            <b-form-input id="email" v-model="email" type="email" required placeholder="Enter your email"></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" v-model="password" type="password" required placeholder="Enter your password"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" block class="mt-3">Login</b-button>
        </b-form>
        <p class="mt-3 text-center">
          Don't have an account? <router-link to="/register" class="text-decoration-none">Register</router-link>
        </p>
      </b-card-body>
    </b-card>
  </b-container>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: this.email,
            password: this.password,
          });
  
          console.log('Login successful:', response.data);
          localStorage.setItem('token', response.data.token); 
          this.$router.push('/todos'); 
          window.location.reload(); 
        } catch (error) {
          console.error('Login error:', error.response?.data?.message || 'Server error');
        }
      },
    },
  };
  </script>
  