<template>
  <b-container class="d-flex justify-content-center align-items-center vh-100">
    <b-card class="w-100" style="max-width: 500px; border-radius: 10px;">
      <b-card-title class="text-center mb-4">Register</b-card-title>
      <b-card-body>
        <b-form @submit.prevent="registerUser">
          <b-form-group label="Username" label-for="username">
            <b-form-input id="username" v-model="username" required placeholder="Choose a username"></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="email">
            <b-form-input id="email" v-model="email" type="email" required placeholder="Enter your email"></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" v-model="password" type="password" required placeholder="Create a password"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" block class="mt-3">Register</b-button>
        </b-form>
        <p class="mt-3 text-center">
          Already have an account? <router-link to="/" class="text-decoration-none">Login</router-link>
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