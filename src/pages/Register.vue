<template>
    <b-container class="d-flex justify-content-center align-items-center vh-100">
      <b-card class="w-50 p-4">
        <b-card-title class="text-center">Register</b-card-title>
        <b-card-body>
          <b-form @submit.prevent="registerUser">
            <b-form-group label="Username" label-for="username">
              <b-form-input id="username" v-model="username" required></b-form-input>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" v-model="email" type="email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input id="password" v-model="password" type="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block>Register</b-button>
          </b-form>
          <p class="mt-3 text-center">
            Already have an account? <router-link to="/">Login</router-link>
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
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
  
          console.log('Registration successful:', response.data);
          this.$router.push('/'); // Redirect to login page
        } catch (error) {
          console.error('Registration error:', error.response?.data?.message || 'Server error');
        }
      },
    },
  };
  </script>