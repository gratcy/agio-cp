<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <label>Select Ticker</label>
          <select class="form-control border-input" v-model= "submit.name" @change="setEnable()">
            <option v-for="item in ticker" v-bind:key="item.dt" :value="item.dt">{{item.name}}</option>
          </select>
          <br>
          <label>Return</label>
          <input type="number" name="" class="form-control border-input" v-model= "submit.value" placeholder="90" @keyup="setEnable()">
          <br>
          <label>Score</label>
          <input type="" name="" class="form-control border-input" v-model= "submit.score" placeholder="right / wrong" @keyup="setEnable()">
         <div class="text-center" style="margin-top:5px;">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click="add" :disabled="button">
           Submit
          </button>
        </div>
        <div class="clearfix"></div>
       
        </div>
        </div>
      </div>
</template>
<script>
import Firebase from 'firebase'
// let config = {
//   databaseURL: 'https://agio-72a5e.firebaseio.com/',
//   apiKey: 'AIzaSyBY4t1yHIaW6MTHFf3-xsc0-c0p-ngvEyg'
// }
// Firebase.initializeApp(config)
export default {
  data () {
    return {
      submit: {},
      type: 'create',
      ticker: [],
      button: true
    }
  },
  created: function () {
    let data = this.$session.has('edit')
    if (data !== false) {
      this.submit = this.$session.get('edit')
      this.submit.name = this.submit.tickerKey + '|' + this.submit.name
      this.type = 'edit'
    } else {
      this.submit = {}
    }
    console.log(this.submit)
    this.defineticker()
    this.setEnable()
  },
  methods: {
    defineticker () {
      let _this = this
      Firebase.database().ref('stocks').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          obj.dt = key + '|' + obj.name
          _this.ticker.push(obj)
        }
      })
    },
    add () {
      if (this.type === 'edit') {
        let name = ''
        let keys = ''
        if (this.submit.name !== '') {
          let split = this.submit.name.split('|')
          if (split.length > 1) {
            name = split[1]
            keys = split[0]
            this.submit.name = name
            this.submit.tickerKey = keys
          }
        }

        Firebase.database().ref('signals/' + this.submit.key).set({
          name: this.submit.name,
          value: parseFloat(this.submit.value),
          score: this.submit.score
        })
        this.$session.remove('edit')
        this.type = 'created'
        this.submit = {}
        this.$router.push('/signal-performance')
      } else {
        let name = ''
        let key = ''
        if (this.submit.name !== '') {
          let split = this.submit.name.split('|')
          name = split[1]
          key = split[0]
        }
        let newPostKey = Firebase.database().ref('signals').push().key
        Firebase.database().ref('signals/' + newPostKey).set({
          name: name,
          tickerKey: key,
          value: parseFloat(this.submit.value),
          score: this.submit.score
        })
        this.$router.push('/signal-performance')
      }
    },
    setEnable () {
      if (typeof this.submit.name !== 'undefined' && typeof this.submit.value !== 'undefined' && typeof this.submit.score !== 'undefined') {
        if (this.submit.name !== '' && this.submit.value !== '' && this.submit.score !== '') {
          this.button = false
        } else {
          this.button = true
        }
      } else {
        this.button = true
      }
    }
  }
}
</script>
