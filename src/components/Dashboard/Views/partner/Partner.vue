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
import Type from './Type.vue'
export default {
  data () {
    return {
      columns: ['ID', 'Name', 'Email', 'HP', 'Status', 'Type', 'Subscriber', 'Rating'],
      tableData: [],
      options: {
        templates: {
          Status: Select,
          Price: Price,
          Type: Type
        },
        headings: {
          ID: 'ID',
          LastLogin: 'Last Login',
          created_at: 'Registered At',
          Type: 'Type',
          Subscriber: 'Subscriber',
          Rating: 'Rating'
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
      Firebase.database().ref('users').orderByChild('level').equalTo('partner').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          if (typeof (obj.lastlogin) !== 'undefined') {
            obj.lastlogin = _this.$moment(obj.lastlogin).format('DD MMM YYYY HH:mm')
          }

          if (typeof (obj.created_at) !== 'undefined') {
            obj.created_at = _this.$moment(obj.created_at).format('DD MMM YYYY HH:mm')
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
                created_at:
                obj.created_at,
                type: obj.level,
                Subscriber: obj.total_subscriber || 0,
                Rating: obj.rating || 0 })
            } else {
              _this.tableData.push({
                ID: obj.key,
                Name: obj.name,
                Email: obj.email,
                HP: obj.nohp,
                Status: 'inactive',
                LastLogin: obj.lastlogin,
                Price: obj.price,
                key: key,
                created_at: obj.created_at,
                type: obj.level,
                Subscriber: obj.total_subscriber || 0,
                Rating: obj.rating || 0 })
            }
          } else {
            if (typeof (obj.status) !== 'undefined') {
              _this.tableData.push({ ID: key, Name: obj.name, Email: obj.email, HP: obj.nohp, Status: obj.status, LastLogin: obj.lastlogin, Price: 'inactive', key: key, created_at: obj.created_at, type: obj.level, Subscriber: obj.total_subscriber || 0, Rating: obj.rating || 0 + ' of 5' })
            } else {
              _this.tableData.push({ ID: key, Name: obj.name, Email: obj.email, HP: obj.nohp, Status: 'inactive', LastLogin: obj.lastlogin, Price: 'inactive', key: key, created_at: obj.created_at, type: obj.level, Subscriber: obj.total_subscriber || 0, Rating: obj.rating || 0 + ' of 5' })
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
