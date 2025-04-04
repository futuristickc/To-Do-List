<template>
    <v-container>
      <v-card class="pa-5">
        <v-card-title class="text-center text-h5">To-Do List</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addTodo">
            <v-text-field v-model="newTodo" label="New Task" required />
            <v-btn type="submit" color="primary" block class="mt-3">Add Task</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
  
      <v-list two-line class="mt-5">
        <v-list-item-group>
          <v-list-item v-for="todo in todos" :key="todo.id">
            <v-list-item-content>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="blue" @click="editTodo(todo)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteTodo(todo.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  
      <!-- Edit Dialog -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>Edit To-Do</v-card-title>
          <v-card-text>
            <v-text-field v-model="editTodoTitle" label="Task Title" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateTodo">Save</v-btn>
            <v-btn color="grey" @click="editDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        todos: [],
        newTodo: '',
        editDialog: false,
        editTodoId: null,
        editTodoTitle: '',
      };
    },
    methods: {
      async fetchTodos() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8080/api/todos', {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.todos = response.data;
        } catch (error) {
          console.error('Error fetching todos:', error.response?.data?.message || 'Server error');
        }
      },
      async addTodo() {
        if (!this.newTodo) return;
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8080/api/todos', 
            { title: this.newTodo },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.todos.push(response.data);
          this.newTodo = '';
        } catch (error) {
          console.error('Error adding todo:', error.response?.data?.message || 'Server error');
        }
      },
      editTodo(todo) {
        this.editTodoId = todo.id;
        this.editTodoTitle = todo.title;
        this.editDialog = true;
      },
      async updateTodo() {
        if (!this.editTodoTitle) return;
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`http://localhost:8080/api/todos/${this.editTodoId}`,
            { title: this.editTodoTitle },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const index = this.todos.findIndex(todo => todo.id === this.editTodoId);
          if (index !== -1) this.todos[index] = response.data;
          this.editDialog = false;
        } catch (error) {
          console.error('Error updating todo:', error.response?.data?.message || 'Server error');
        }
      },
      async deleteTodo(id) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8080/api/todos/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.todos = this.todos.filter(todo => todo.id !== id);
        } catch (error) {
          console.error('Error deleting todo:', error.response?.data?.message || 'Server error');
        }
      },
    },
    mounted() {
      this.fetchTodos();
    },
  };
  </script>