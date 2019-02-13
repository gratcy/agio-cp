<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <router-link to="/portofolio-check-up/add">
            <v-btn class="pull-right"><i class="ti-plus"></i> Checkup</v-btn>
          </router-link>
          <v-client-table :data="tableData" :columns="columns" name="dt" :options="options">
          </v-client-table>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import Firebase from 'firebase'
import Upload from './upload.vue'
import Select from './Select.vue'
import { size, result } from 'lodash'
export default {
  data () {
    return {
      columns: ['created_at', 'name', 'email', 'ticker', 'result', 'statusPortofolio'],
      tableData: [],
      options: {
        templates: {
          result: Upload,
          statusPortofolio: Select
        },
        orderBy: { column: false },
        headings: {
          statusPortofolio: 'Status'
        }
      }
    }
  },
  mounted: function () {
    this.definedata()
  },
  methods: {
    definedata () {
      // let _this = this
      this.tableData = []
      // let portofolio = Firebase.database().ref('portofolio_checkup')
      let _this = this
      let users = Firebase.database().ref().child('users')
      let tickerstock = Firebase.database().ref().child('stocks')
      Firebase.database().ref('portofolio_checkup').orderByChild('order').on('value', function (snap) {
        snap = snap.val()
        for (let key in snap) {
          let dt = snap[key]
          let createdat = _this.$moment(dt.created_at).format('YYYY-MM-DD')
          users.child(dt.uid).once('value', function (usrs) {
            let usr = usrs.val()
            if (result(usr, 'name')) {
              let ticker = []

              if (size(dt.tickers) > 0) {
                for (let i = 0; i < dt.tickers.length; i++) {
                  tickerstock.child(dt.tickers[i]).once('value', function (stock) {
                    ticker.push(stock.val().name)
                    if (i === dt.tickers.length - 1) {
                      if (typeof dt.analis !== 'undefined') {
                        users.child(dt.analis).once('value', function (analis) {
                         _this.tableData.push({name: usr.name, email: usr.email, ticker: ticker.join(', '), status: dt.status, key: key, result: dt.result, price: dt.price, uid: dt.uid, analis: dt.analis, analisname: analis.val().name, created_at: createdat})
                        })
                      } else {
                        _this.tableData.push({name: usr.name, email: usr.email, ticker: ticker.join(', '), status: dt.status, key: key, result: dt.result, price: dt.price, uid: dt.uid, created_at: createdat})
                      }
                    } else {
                      if (typeof dt.analis !== 'undefined' && usr.name) {
                        users.child(dt.analis).once('value', function (analis) {
                          _this.tableData.push({name: usr.name, email: usr.email, status: dt.status, key: key, result: dt.result, price: dt.price, uid: dt.uid, analis: dt.analis, analisname: analis.val().name, created_at: createdat})
                        })
                      } else {
                        _this.tableData.push({name: usr.name, email: usr.email, status: dt.status, key: key, result: dt.result, price: dt.price, uid: dt.uid, created_at: createdat})
                      }
                    }
                  })
                }
              }
            }
          })
        }
      })
    }
  }
}
</script>
<style>

</style>
