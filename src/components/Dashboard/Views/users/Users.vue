<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <v-client-table :data="tableData" :columns="columns" name="dt" :options="options">
          </v-client-table>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import Firebase from 'firebase'
import Select from './Select.vue'
import Price from './Price.vue'
import NPrice from './nprice.vue'
import NNews from './nnews.vue'
import Type from './Type.vue'
import Global from '../global'
export default {
  data () {
    return {
      columns: ['ID', 'Name', 'Email', 'HP', 'Status', 'Type', 'NPrice', 'NNews', 'expired'],
      tableData: [],
      options: {
        templates: {
          Status: Select,
          Price: Price,
          Type: Type,
          NPrice: NPrice,
          NNews: NNews
        },
        headings: {
          expired: 'Expired Price Action',
          LastLogin: 'Last Login',
          created_at: 'Registered At',
          Type: 'Type',
          NPrice: 'Notif Price Action',
          NNews: 'Notif Event'
        }
      }
    }
  },
  mounted: function () {
    this.definedata()
  },
  methods: {
    definedata () {
      let _this = this
      Firebase.database().ref('users').orderByChild('level').equalTo('member').on('value', function (snapshot) {
        let dt = snapshot.val()
        dt = Global.__sort_object(dt)
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          if (typeof (obj.lastlogin) !== 'undefined') {
            obj.lastlogin = _this.$moment(obj.lastlogin).format('DD MMM YYYY HH:mm')
          }

          if (typeof (obj.created_at) !== 'undefined') {
            obj.created_at = _this.$moment(obj.created_at).format('DD MMM YYYY HH:mm')
          }

          if (typeof (obj.expired) !== 'undefined' && obj.expired !== 0) {
            obj.expired = _this.$moment(obj.expired).format('DD MMM YYYY HH:mm')
          }

          if (typeof (obj.price) !== 'undefined') {
            if (typeof (obj.status) !== 'undefined') {
              _this.tableData.push({ ID: key,
                Name: obj.name,
                Email: obj.email,
                HP: obj.nohp,
                Status: obj.status,
                LastLogin: obj.lastlogin,
                Price: obj.price,
                key: key,
                expired: obj.expired,
                created_at:
                obj.created_at,
                type: obj.level,
                notification_price_action: obj.notification_price_action,
                notification_news: obj.notification_news })
            } else {
              _this.tableData.push({
                ID: key,
                Name: obj.name,
                Email: obj.email,
                HP: obj.nohp,
                Status: 'inactive',
                LastLogin: obj.lastlogin,
                Price: obj.price,
                key: key,
                expired: obj.expired,
                created_at: obj.created_at,
                type: obj.level,
                notification_price_action: obj.notification_price_action,
                notification_news: obj.notification_news })
            }
          } else {
            if (typeof (obj.status) !== 'undefined') {
              _this.tableData.push({ ID: key, Name: obj.name, Email: obj.email, HP: obj.nohp, Status: obj.status, LastLogin: obj.lastlogin, Price: 'inactive', key: key, expired: obj.expired, created_at: obj.created_at, type: obj.level, notification_price_action: obj.notification_price_action, notification_news: obj.notification_news })
            } else {
              _this.tableData.push({ ID: key, Name: obj.name, Email: obj.email, HP: obj.nohp, Status: 'inactive', LastLogin: obj.lastlogin, Price: 'inactive', key: key, expired: obj.expired, created_at: obj.created_at, type: obj.level, notification_price_action: obj.notification_price_action, notification_news: obj.notification_news })
            }
          }
        }
      })
    }
  }
}
</script>
<style>

</style>
