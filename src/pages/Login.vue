<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="pa-5" width="400">
        <v-card-title class="text-center">Login </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="loginUser">
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field v-model="password" label="Password" type="password" required />
            <v-btn type="submit" color="primary" block class="mt-3">Login</v-btn>
          </v-form>
          <p class="mt-3 text-center">
            Don't have an account? <router-link to="/register">Register</router-link>
          </p>
        </v-card-text>
      </v-card>
    </v-container>
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
          localStorage.setItem('token', response.data.token); // Store token
          this.$router.push('/todos'); // Redirect to To-Do List
        } catch (error) {
          console.error('Login error:', error.response?.data?.message || 'Server error');
        }
      },
    },
  };
  </script>
  