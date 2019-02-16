<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <div class="row">
            <div class="col-md-6">
             <div class="form-group">
                <label>Select Type</label>
                <select class="form-control border-input" v-model="submit.call" @change="setEnable()">
                  <option value="buy" selected="selected">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
               <div class="form-group">
                  <label>Select Ticker</label>
                  <select class="form-control border-input" v-model= "submit.ticker" @change="setEnable()">
                    <option v-for="item in ticker" v-bind:key="item.dt" :value="item.dt">{{item.name}}</option>
                  </select>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label>Entry Price Point</label>
              <input type="" name="" class="form-control border-input" v-model= "price" placeholder="200" @keyup="setEnable()">
            </div>
            <div class="col-md-3">
              <label>Last Price</label>
              <input type="" name="" class="form-control border-input" v-model= "lastPrice" placeholder="300" @keyup="setEnable()">
            </div>
             <div class="col-md-3">
              <label>Target</label>
              <input type="" name="" class="form-control border-input" v-model= "target" placeholder="800" @keyup="setEnable()">
            </div>
            <div class="col-md-3">
              <label>Potential Upside / Downside</label>
              <input type="text" name="" class="form-control border-input" v-model="submit.potentialUpside" placeholder="80" @keyup="setEnable()" readonly="readonly">
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-4">
              <label>Start Price Date</label>
              <datepicker v-model="submit.start_date" :format="customFormatter" class="form-control"></datepicker>       
            </div>
            <div class="col-md-4">
              <label>Last Price Date</label>
               <datepicker v-model="date" :format="customFormatter" class="form-control"></datepicker>
            </div>
            <div class="col-md-4">
              <label>Stop Loss</label>
              <input type="" name="" class="form-control border-input" v-model= "stopLoss" placeholder="150" @keyup="setEnable()">
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-2">
              <label>Ranking</label>
              <input type="number" name="" class="form-control border-input" v-model= "submit.order" placeholder="1" @keyup="setEnable()">
            </div>
            <div class="col-md-6">
              <label>Analyst by</label>
              <!-- <input type="" name="" class="form-control border-input" v-model= "submit.analis" placeholder="1" @keyup="setEnable()"> -->
              <select class="form-control border-input" v-model="submit.analis" @change="setEnable()">
                <option v-for="item in analis" v-bind:key="item.value" :value="item.value">{{item.text}}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Status</label>
              <select class="form-control border-input" v-model="submit.status" @change="setEnable()">
                  <option value="publish" selected="selected">Publish</option>
                  <option value="unpublish">Unpublish</option>
                </select>
            </div>
          </div> 

         <div class="text-center" style="margin-top:15px;">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="add" :disabled="button">
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
import Datepicker from 'vuejs-datepicker'
import Global from '../global'
export default {
  data () {
    return {
      submit: {},
      call: '',
      type: 'create',
      ticker: [],
      date: '',
      button: true,
      result3: null,
      price: '',
      lastPrice: '',
      target: '',
      stopLoss: '',
      potentialUpside: '',
      analis: []
    }
  },
  components: {
    Datepicker
  },
  watch: {
    price: function (val) {
      let real = val.split('.').join('')
      let amtnumber = Global.createOptions(real)
      this.submit.price = real
      this.price = amtnumber
      let target = this.submit.target
      if (real > 0 && target > 0) {
        let angka = ((parseFloat(target) - parseFloat(real)) / parseFloat(real)) * 100
        this.submit.potentialUpside = angka.toFixed(1)
      }
    },
    lastPrice: function (val) {
      let real = val.split('.').join('')
      let amtnumber = Global.createOptions(real)
      this.submit.lastPrice = real
      this.lastPrice = amtnumber
    },
    target: function (val) {
      let real = val.split('.').join('')
      let amtnumber = Global.createOptions(real)
      this.submit.target = real
      this.target = amtnumber
      let entry = this.submit.price
      if (parseFloat(real) > 0 && parseFloat(entry) > 0) {
        let angka = ((parseFloat(real) - parseFloat(entry)) / parseFloat(entry)) * 100
        this.submit.potentialUpside = angka.toFixed(1)
      }
    },
    stopLoss: function (val) {
      let real = val.split('.').join('')
      let amtnumber = Global.createOptions(real)
      this.submit.stopLoss = real
      this.stopLoss = amtnumber
    }
  },
  created: function () {
    // console.log(this.submit)
    let data = this.$session.has('edit')
    if (data !== false) {
      this.submit = this.$session.get('edit')
      this.submit.ticker = this.submit.tickerKey + '|' + this.submit.ticker
      this.type = 'edit'
      let theDate = new Date(this.submit.start_date)
      this.submit.start_date = this.$moment(theDate.toGMTString()).format('YYYY-MM-DD')
      let theDate2 = new Date(this.submit.end_date)
      this.date = new Date(this.$moment(theDate2.toGMTString()).format('YYYY-MM-DD'))
      this.price = Global.createOptions(this.submit.price.split('.').join(''))
      this.submit.lastPrice = '' + this.submit.lastPrice
      this.lastPrice = Global.createOptions(this.submit.lastPrice.split('.').join(''))
      this.submit.target = '' + this.submit.target
      this.target = Global.createOptions(this.submit.target.split('.').join(''))
      this.submit.stopLoss = '' + this.submit.stopLoss
      this.stopLoss = Global.createOptions(this.submit.stopLoss.split('.').join(''))
    } else {
      this.submit = {}
      this.date = ''
      this.price = ''
      this.lastPrice = ''
      this.target = ''
      this.stopLoss = ''
      this.potentialUpside = ''
    }
    this.defineticker()
    this.setEnable()
    this.analiss()
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
    analiss () {
      let _this = this
      Firebase.database().ref('users').orderByChild('level').equalTo('analis').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.analis = []
        for (let key in dt) {
          let obj = dt[key]
          _this.analis.push({text: obj.name, value: key})
        }
      })
    },
    add () {
      if (this.type === 'edit') {
        let key = this.submit.key
        delete this.submit.key

        let ticker = ''
        let keys = ''
        if (this.submit.ticker !== '') {
          let split = this.submit.ticker.split('|')
          if (split.length > 1) {
            ticker = split[1]
            keys = split[0]
            this.submit.ticker = ticker
            this.submit.tickerKey = keys
          }
        }

        this.submit.start_date = new Date(this.submit.start_date).getTime()
        this.submit.end_date = new Date(this.date).getTime()
        this.submit.updated_at = Date.now()
        this.submit.price = parseFloat(this.submit.price)
        this.submit.lastPrice = parseFloat(this.submit.lastPrice)
        this.submit.stopLoss = parseFloat(this.submit.stopLoss)
        this.submit.target = parseFloat(this.submit.target)
        this.submit.potentialUpside = parseFloat(this.submit.potentialUpside)
        Firebase.database().ref('priceAction/' + key).set(this.submit)
        let message = 'Call to ' + this.submit.call + ' ' + this.submit.ticker + ' last price ' + Global.createOptions(this.submit.lastPrice)
        let notif = {created_at: new Date().getTime(), message: message, status: 'unread', title: 'Price Action Alert', type: 'Price Action alert', updated_at: new Date().getTime(), order: new Date().getTime() * -1, price_action_key: key, code: 'NA001'}
        Firebase.database().ref('users').on('value', function (snapshot) {
          let dt = snapshot.val()
          for (let keys in dt) {
            let keywilluse = Firebase.database().ref('notifications/' + keys).push().key
            Firebase.database().ref('notifications/' + keys + '/' + keywilluse).set(notif)
            if (typeof dt[keys].fcm !== 'undefined' && dt[keys].fcm !== '' && dt[keys].notification_price_action === 'active') {
              let notfcm = {
                to: dt[keys].fcm,
                notification: {
                  code: 'NA001',
                  title: 'Price Action',
                  body: message,
                  price_action_key: key
                }
              }
              Global.fcm(notfcm)
            }
          }
        })
        this.$session.remove('edit')
        this.type = 'created'
        this.submit = {}
        this.$router.push('/price-action')
      } else {
        let ticker = ''
        let key = ''
        if (this.submit.ticker !== '') {
          let split = this.submit.ticker.split('|')
          ticker = split[1]
          key = split[0]
        }

        this.submit.start_date = new Date(this.submit.start_date).getTime()
        this.submit.end_date = new Date(this.date).getTime()
        this.submit.created_at = Date.now()
        this.submit.updated_at = Date.now()
        this.submit.ticker = ticker
        this.submit.tickerKey = key
        this.submit.type = 'Agio'
        this.submit.price = parseFloat(this.submit.price)
        this.submit.lastPrice = parseFloat(this.submit.lastPrice)
        this.submit.stopLoss = parseFloat(this.submit.stopLoss)
        this.submit.target = parseFloat(this.submit.target)
        this.submit.potentialUpside = parseFloat(this.submit.potentialUpside)
        let newPostKey = Firebase.database().ref('priceAction').push().key
        Firebase.database().ref('priceAction/' + newPostKey).set(this.submit)
        this.$router.push('/price-action')
      }
    },
    customFormatter (date) {
      return this.$moment(date).format('YYYY-MM-DD')
    },
    setEnable () {
      if (typeof this.submit.call !== 'undefined' && typeof this.submit.ticker !== 'undefined' && typeof this.submit.price !== 'undefined' && typeof this.submit.lastPrice !== 'undefined' && typeof this.submit.target !== 'undefined' && typeof this.submit.start_date !== 'undefined' && typeof this.date !== 'undefined' && typeof this.submit.stopLoss !== 'undefined' && typeof this.submit.analis !== 'undefined') {
        if (this.submit.call !== '' && this.submit.ticker !== '' && this.submit.price !== '' && this.submit.lastPrice !== '' && this.submit.target !== '' && this.submit.start_date !== '' && this.date !== '' && this.submit.stopLoss !== '' && this.submit.analis !== '') {
          this.button = false
        } else {
          this.button = true
        }
      } else {
        this.button = true
      }
    },
    formatDate: function (date) {
      if (date === null) {
        return '[null]'
      } else {
        return date.format('YYYY-MM-DD')
      }
    }
  }
}
</script>
