<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="pa-5" width="400">
        <v-card-title class="text-center">Register </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="registerUser">
            <v-text-field v-model="username" label="Username" required />
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field v-model="password" label="Password" type="password" required />
            <v-btn type="submit" color="primary" block class="mt-3">Register</v-btn>
          </v-form>
          <p class="mt-3 text-center">
            Already have an account? <router-link to="/">Login</router-link>
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