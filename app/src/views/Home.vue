<template>
  <div class="home">
    <button @click="login()">Login</button>
    <button @click="logout()">Logout</button>
    
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "home",
  components: {

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
    },
    logout(){
      if(localStorage.token){
        localStorage.token = '';
        console.log('logout');
      }
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
