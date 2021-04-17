<template>
  <div>
    <!-- <button v-on:click="makeElement">URL作成ボタン</button> -->
    <h2>迷ったらココ！</h2>
      店名: {{ shops.name[0] }}
      <br>
      画像: <img v-bind:src="shops.image[0]">
      <br>
      アクセス: {{ shops.access[0] }}
    <hr>
    <h2>他のおすすめはこちら</h2>
    <ul>
      <!-- <li v-for="{n,i} in name" v-bind:key="i">
          店名: {{n}}
          <hr>
      </li> -->
      <!-- <li v-for="(value,key) in shops" :key="key">
        {{ value }}
      </li> -->
      <li v-for="(n,i) in 10" :key="i">
        店名: {{ shops.name[n] }}
        <br>
        画像: <img v-bind:src="shops.image[n]">
        <br>
        アクセス: {{ shops.access[n] }}
        <hr>
      </li>
    </ul>
  </div>
</template>
<script>
  import firebase from "firebase"
  import fetchJsonp from 'fetch-jsonp';

  export default {
    data() {
      return {
        // 取得情報
        shops: {
          name: [],
          access: [],
          image: [],
          url: [],
        },

        fire_id: "",
        //urlの要素
        url: "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=8e4d1b61c3a4e4a4",
        optionTime: 0,
        optionStation: "",
        optionGenre: "",
        genre: {},
      }
    },
    created() {
      this.makeElement()
      this.$emit("img", false)
    },
    methods: {
      // window:onload = function(){
      makeElement(){
        // let maxGenre = ""
        let maxGenreVote = 0

        //firebaseから検索値取得
        let db = firebase.firestore()
        // let docRef = db.collection("rooms").doc("JDbqSjoCMTSbK5SI7lZF")//docの中身はRoom.vueから持ってくる
        this.fire_id = this.$route.params.id
        let docRef = db.collection("rooms").doc(this.fire_id)

        docRef.get().then((doc) => {
          if (doc.exists) {
              this.optionTime = doc.data().time
              this.optionStation = doc.data().station
              this.genre = { ...doc.data().genre }
          } else {
              console.log("No such document!");
          }
          //genreの決定
          for(let k in this.genre) {
            if(this.genre[k][1] >= maxGenreVote){
              this.optionGenre = this.genre[k][0]
              maxGenreVote = this.genre[k][1]
            }
          }
          //url生成
          this.makeUrl()
        })
      },
      makeUrl() {
        let optionJsonp = "&format=jsonp"
        this.url = this.url + "&lunch=" + this.optionTime + "&keyword=" + this.optionStation + " " + this.optionGenre + optionJsonp
        this.getApi()
      },
      getApi() {
      fetchJsonp(this.url)
        .then((res)=>{
          return res.json() // 結果を json として読み込んで、次の then に渡す
        })
        .then((data)=>{
          // var shops = data.results.shop
          for (var item in data.results.shop) {
            // console.log(data.results.shop[item])
            this.shops.name.push(data.results.shop[item].name)
            this.shops.access.push(data.results.shop[item].access)
            this.shops.image.push(data.results.shop[item].photo.pc.m)
          }
        })
      }
    }
  }
</script>