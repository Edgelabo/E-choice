<template>
  <div id="app">
    <header>
      <div class="title">
        <h3>ご飯屋決定アプリ</h3>
        <h2>E-Choice
        </h2>
      </div>
      <button>
        <router-link to="/">Home</router-link>
      </button>
    </header>
    <div class="contents">
      <div class="slide" id="makeImg" v-if="images">
        <img src="../images/cake.jpg" alt="ケーキ">
        <img src="../images/chinese.jpg" alt="中華">
        <img src="../images/hamburger.jpg" alt="ハンバーガー">
        <img src="../images/korean.jpg" alt="韓国">
        <img src="../images/pizza.jpg" alt="ピザ">
      </div>
      <div v-if="isLogin" class="group">
        <router-view @img="deleteImage"/>
        <div id="show">
          <button class="logout" v-on:click="logout" v-if="!(show)">ログアウト</button>
        </div>
      </div>
    <div v-else>
      <Login/>
    </div>
    </div>
    <footer>
      <span>Copyright © チャレンジ２年生 All Rights Reserved.</span>
    </footer>
  </div>
</template>

<script>
import Login from "./components/login.vue"
import firebase from "firebase"

export default {
  components :{
    Login
  },
  data (){
    return {
      isLogin :false,
      show :false,
      images :true,
    }
  },
  mounted (){
    firebase.auth().onAuthStateChanged(() => (this.isLogin = true))
  },
  methods :{
    logout (){
      firebase.auth().signOut()
      this.isLogin = false
    },
    click() {
      this.show = !this.show;
    },
    deleteImage (signal){
      this.images = signal
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff8dc;
  color: #393939;
}

header {
  background-color: #ffffff;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  display: flex;
  flex-direction: column;
}

h3 {
  font-size: 18px;
  margin: 0;
  margin-left: 15px;
}

h2 {
  font-size: 40px;
  margin: 0;
  margin-left: 30px;
}

.contents {
  display: flex;
  margin-top: 100px;
}

.group {
  margin: auto;
}

.slide {
  position   : relative;
  overflow   : hidden;
                    /* 画像のサイズに合わせて変更ください */
  width      : 400px;
  height     : 600px;
  margin : auto;      /* サンプルは中央寄せの背景：白 */
  background : #fff;
}

.slide img {
  display    : block;
  position   : absolute;
                      /* 画像のサイズを表示エリアに合せる */
  width      : inherit;
  height     : inherit;
  opacity    : 0;
  animation  : slideAnime 25s ease infinite;
}
 
 /*=== スライドのアニメーションを段差で開始する ========= */
.slide img:nth-of-type(1) { animation-delay: 0s }
.slide img:nth-of-type(2) { animation-delay: 5s }
.slide img:nth-of-type(3) { animation-delay: 10s }
.slide img:nth-of-type(4) { animation-delay: 15s }
.slide img:nth-of-type(5) { animation-delay: 20s }
 
 /*=== スライドのアニメーション ========================= */
@keyframes slideAnime{
   0% { opacity: 0 }
   5% { opacity: 1 }
  20% { opacity: 1 }
  25% { opacity: 0 }
 100% { opacity: 0 }
}

a {
  padding: 0 10px;
  margin: 0 5px;
  height: 40px;
  width: 80px;
  letter-spacing: 1.2px;
  text-decoration: none;
  border-radius: 25px;
  background: #ffffff;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.logout {
  margin-top: 100px;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  height: 40px;
  background-color: #f8b600;
  font-size: 15px;
  color: #fff;
}
</style>
