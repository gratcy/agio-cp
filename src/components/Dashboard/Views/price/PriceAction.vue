<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <router-link to="/price-action/add">
            <v-btn class="pull-right"><i class="ti-plus"></i> Call </v-btn>
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
import Button from './Button.vue'
import Global from '../global'
import { orderBy } from 'lodash'

export default {
  data () {
    return {
      columns: ['type', 'created_at', 'order', 'ticker', 'price', 'last', 'target', 'stop', 'potential', 'call', 'analisname', 'action'],
      tableData: [],
      options: {
        templates: {
          action: Button
        },
        headings: {
          analisname: 'Analyst',
          created_at: 'Created at',
          order: 'Ranking'
        }
      }
    }
  },
  mounted: function () {
    this.definedata()
    this.$session.remove('edit')
  },
  methods: {
    definedata () {
      let _this = this
      let users = Firebase.database().ref().child('users')
      Firebase.database().ref('priceAction').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          let createdAt = obj.created_at ? _this.$moment(obj.created_at).format('DD MMM YYYY HH:mm') : '-'
          users.child(obj.analis).once('value', function (usrs) {
            _this.tableData.push({ order: obj.order, type: obj.type || 'Agio', created_at: createdAt, ticker: obj.ticker, price: Global.createOptions(obj.price), last: Global.createOptions(obj.lastPrice), target: Global.createOptions(obj.target), stop: Global.createOptions(obj.stopLoss), potential: Global.createOptions(obj.potentialUpside), call: obj.call, key: key, stopLoss: obj.stopLoss, potentialUpside: obj.potentialUpside, start_date: obj.start_date, end_date: obj.end_date, lastPrice: obj.lastPrice, tickerKey: obj.tickerKey, status: obj.status, analis: obj.analis, analisname: usrs.val().name })
          })
        }
        _this.tableData = _this.tableData.reverse()
      })
    }
  }
}
</script>
<style>

</style>
