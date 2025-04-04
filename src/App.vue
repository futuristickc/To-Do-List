<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mt-4 mx-4">
      <h1 class="text-center">Todo App</h1>
      <button 
        v-if="isLoggedIn" 
        @click="logout" 
        class="btn btn-danger">
        Logout
      </button>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Update path if needed
    }
  }
};
</script>