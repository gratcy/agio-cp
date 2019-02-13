<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <div class="form-group">
            <label>Choose User</label>
            <select class="form-control border-input" v-model= "submit.userkey" @change="setEnable()">
              <option v-for="item in user" v-bind:key="item.key" :value="item.key">{{item.name}}</option>
            </select>
          </div>
          <div class="form-group">
             <label>Choose Ticker</label>
            <select class="form-control border-input" v-model= "submit.ticker" @change="setEnable()">
              <option v-for="item in ticker" v-bind:key="item.key" :value="item.key">{{item.name}}</option>
            </select>
          </div>
        <div class="text-center">
          <v-btn class="btn btn-info btn-fill btn-wd" @click="add" style="margin-top:5px;" :disabled="button">Submit</v-btn>
        </div>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import Firebase from 'firebase'
export default {
  data () {
    return {
      submit: {},
      call: '',
      type: 'create',
      ticker: [],
      user: [],
      button: true
    }
  },
  created: function () {
    this.defineticker()
    this.defineusr()
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
    defineusr () {
      let _this = this
      Firebase.database().ref('users').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          _this.user.push(obj)
        }
      })
    },
    add () {
      this.submit.status = 'pending'
      let newPostKey = Firebase.database().ref('portofolioCheckUp').push().key
      Firebase.database().ref('portofolioCheckUp/' + newPostKey).set(this.submit)
      this.$router.push('/portofolio-check-up')
    },
    setEnable () {
      if (typeof this.submit.userkey !== 'undefined' && typeof this.submit.ticker !== 'undefined') {
        if (this.submit.userkey !== '' && this.submit.ticker !== '') {
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
