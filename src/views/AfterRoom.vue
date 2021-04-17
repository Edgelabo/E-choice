<template>
  <div>
      <div>ルーム名</div>
      <div>メンバー欄</div>
      <div>
          <div>ジャンル</div>
          <div v-for="(value,key,index) in genre" v-bind:key="index">

      <label><input @click = "room (key)" type="radio" name="radio">{{value[0]}}</label>
      
          </div> 
      </div>
     <router-link v-bind:disabled = "isCompleted" v-on:click = "saveRoom" :to="{ name: 'Result', params: { id: roomId} }" tag="button">決定</router-link>


  </div>
</template>

<script>
import firebase from "firebase"
export default {
   data:function(){
    return{
      roomId:"",
    genre:{
      chuka:"",
      itariann:"",
      izakaya:"",
      niku:"",
    },
    isCompleted:true,
    word:""
    }
  },
  methods:{
    saveRoom:function(){
      firebase.firestore().collection("rooms").update({
        genre: this.genre
      });
    },

     room:function(word){
       
  this.isCompleted = false
let array = Object.keys(this.genre)
console.log(array);

for(let i=0;i<array.lenght;i++){
this.genre[array[i]][1]=0;
}

this.genre[word][1]=1;
     }
  }, 
  mounted() {
    this.roomId = this.$route.params.id
    firebase
      .firestore()
      .collection("rooms").doc(this.roomId)
      .get()
      .then(doc => {
          this.genre = doc.data().genre
          
        });
      
  },
  




}

</script>

<style>

</style>