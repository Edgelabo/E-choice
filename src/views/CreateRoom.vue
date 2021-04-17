<template>
<div class="createroom">
  <div>部屋の名前</div>
  
  <input v-model = "room" @change="going" type = "text"/>
  <div>パスワード</div>
  <input v-model = "password" @change="going" type="text"/>
  
  <div>時間帯</div>

<label><input v-model = "time" value = 1 type="radio" name="radio">昼</label>
<label><input v-model = "time" value = 0 type="radio" name="radio">夜</label>

<div>最寄駅</div>
<input v-model = "station" @change="going" type = "text"/>
<div>
  <router-link v-bind:disabled = "isCompleted" v-on:click = "saveRoom" to="/" tag="button">決定</router-link>
  <router-link to='/' tag="button">戻る</router-link> 
</div>
</div>

</template>

<script>
import firebase from "firebase"

export default {
  name: 'home',
  data:function(){
    return{
    id: "",
    room: "",
    password:"",
    station:"",
    time:1,
    isCompleted:true
    }
  },
  methods:{
    saveRoom:function(){
      firebase.firestore().collection("rooms").add({
        name: this.room,
        passWord:this.password,
        station:this.station,
        time:this.time,
        genre:{
          chuka:["中華",0],
          itarian:["イタリアン",0],
          izakaya:["居酒屋",0],
          niku:["肉",0]

        },
        member:[],

        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      },
      going:function(){
      if (this.room !="" && this.password != "" && this.station !=""){
       this.isCompleted = false
      }
     else {
       this.isCompleted = true
     }
    
    }
  },
  
    
  
}


</script>


<style>
.createroom {
  display: flex;
  flex-direction: column;
}

.saveroom {
  height: 50px;
  width: 150px;
}
</style>