<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data(){
    return{

    }
  },
  methods: {
    
    getRecipe(){
      let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
      }
      axios
        .get("http://localhost:8080/recipes/posts", {headers: headers}) 
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted(){
    this.getRecipe();
  }
}
</script>
