<template>
<div>
    <router-link to="/CreateRoom" tag="button">作る</router-link>
    <button>入る</button>
    <div>グループ一覧
    <ul>
        <li v-for="item in rooms" :key="item">
            <router-link :to="{ name: 'AfterRoom', params: { id: item.id }}" >
                {{ item.name }}
            </router-link>
        </li>
    </ul>
    </div>
</div>
</template>

<script>
import firebase from "firebase"
export default {
    data() {
      return {
        rooms: [],
      }
    },
    created(){
        this.getRoom()
    },
    methods: {
        getRoom(){
            let db = firebase.firestore().collection("rooms")
            db.get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                this.rooms.push({
                    id: doc.id,
                    ...doc.data()
                });
                });
            });
        },
    }
    // methods: {
    //     getRoom(){
    //         //firebaseから検索値取得
    //         let db = firebase.firestore()
    //         // let docRef = db.collection("rooms").doc("JDbqSjoCMTSbK5SI7lZF")//docの中身はRoom.vueから持ってくる
    //         this.fire_id = this.$route.params.id
    //         let docRef = db.collection("rooms").doc(this.fire_id)

    //         docRef.get().then((doc) => {
    //             if (doc.exists) {
    //                 this.optionTime = doc.data().time
    //                 this.optionStation = doc.data().station
    //                 this.genre = { ...doc.data().genre }
    //             } else {
    //                 console.log("No such document!");
    //             }
    //         }
    //     },
}
</script>

<style>
.create-room {
  height: 50px;
  width: 150px;
}

</style>