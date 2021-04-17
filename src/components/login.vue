<template>
  <div>
    <div class="container">
    <!-- ログイン -->
    <button v-on:click="doLogin" class="loginbutton">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      user: null,
      user2: {},
    };
  },
  methods: {
    doLogin(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    this.user=result.user
  });
  }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}

.login, .register {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 5%;
  margin-left: 5%;
}

button {
  margin: 25px;
  height: 50px;
  width: 150px;
  letter-spacing: 1.2px;
  border: 2px solid #f8b600;
  border-radius: 25px;
  background-color: #fff;
  color: #202020;
}

.loginbutton {
  margin-right: 200px;
  margin-top: 200px;
}
</style>