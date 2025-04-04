<template>
    <div class="container mt-4">
      <h2 class="mb-4">My To-Do List</h2>
  
      
      <form @submit.prevent="addTodo">
        <div class="mb-3">
          <input v-model="newTodo.title" type="text" class="form-control" placeholder="Title" required />
        </div>
        <div class="mb-3">
          <textarea v-model="newTodo.description" class="form-control" placeholder="Description" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add To-Do</button>
      </form>
  
      <hr />
  
      
      <ul class="list-group">
        <li v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ todo.title }}</h5>
            <p>{{ todo.description }}</p>
          </div>
          <div>
            <button class="btn btn-success me-2" @click="toggleComplete(todo)">
              {{ todo.completed ? "Undo" : "Complete" }}
            </button>
            <button class="btn btn-danger" @click="deleteTodo(todo.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
</template>
  
<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        todos: [],
        newTodo: {
          title: "",
          description: ""
        }
      };
    },
    async created() {
      await this.fetchTodos();
    },
    methods: {
      async fetchTodos() {
        try {
          const response = await axios.get("http://localhost:8080/api/todos", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          this.todos = response.data;
        } catch (error) {
          console.error("Error fetching todos", error);
        }
      },
      async addTodo() {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/todos",
            this.newTodo,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
          this.todos.unshift(response.data);
          this.newTodo.title = "";
          this.newTodo.description = "";
        } catch (error) {
          console.error("Error adding todo", error);
        }
      },
      async toggleComplete(todo) {
  try {
    const url = `http://localhost:8080/api/todos/${todo.id}`;
    console.log("Making PUT request to:", url);  // confirm URL in console
    const response = await axios.put(
      url,
      {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    todo.completed = response.data.completed;
  } catch (error) {
    console.error("Error updating todo", error);
  }
},

async deleteTodo(todo) {
  try {
    const url = `http://localhost:8080/api/todos/${todo.id}`;
    console.log("Making DELETE request to:", url);  // helpful for debugging

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Optionally remove the todo from the local list:
    this.todos = this.todos.filter(t => t.id !== todo.id);
  } catch (error) {
    console.error("Error deleting todo", error);
  }
}


      // async deleteTodo(id) {
      //   try {
      //     await axios.delete(`http://localhost:8080/api/todos/${id}`, {
      //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      //     });
      //     this.todos = this.todos.filter(todo => todo.id !== id);
      //   } catch (error) {
      //     console.error("Error deleting todo", error);
      //   }
      // }
    }
  };
</script>