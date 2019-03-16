<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="login()">Login</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      email: "madison@oncodna.com",
      password: "password",
      token: ''
    };
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      };
      axios
        .post("http://localhost:8080/auth/login", user)
        .then(res => {
          console.log(res.data.message);
          console.log(res.data.token);
          localStorage.token = res.data.token;
        })
        .catch(err => {
          console.log(user);
          console.log(err);
        });
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
      console.log(this.token);
    }
  },
  created() {
    
  }
};
</script>
