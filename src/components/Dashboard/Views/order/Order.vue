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
import { result } from 'lodash'
import Firebase from 'firebase'
import Select from './Status.vue'
import View from './View.vue'
import Global from '../global'
export default {
  data () {
    return {
      columns: ['key', 'order_id', 'created_at', 'ttype', 'type', 'analisname', 'total', 'user', 'status', 'account', 'Confirmation'],
      tableData: [],
      options: {
        templates: {
          status: Select,
          Confirmation: View
        },
        headings: {
          key: 'ID',
          order_id: 'Order ID',
          created_at: 'Created At',
          ttype: 'Order For',
          type: 'Type',
          analisname: 'Analyst Name',
          total: 'Amount',
          account: 'Bank',
          status: 'Status',
          user: 'User'
        }
      }
    }
  },
  mounted: function () {
    this.definedata()
  },
  methods: {
    definedata () {
      const orderType = {
        PortofolioCheckup: 'Portofolio Checkup',
        PremiumMembership: 'Premium Membership',
        Event: 'Event',
        ProTrade: 'Pro Trade'
      }

      let _this = this
      let users = Firebase.database().ref().child('users')
      let account = Firebase.database().ref().child('accounts')
      Firebase.database().ref('payments').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          if (obj.type !== 'ProTrade') {
            obj.analisname = '-'
          }
          obj.created_at = _this.$moment(obj.created_at).format('DD MMM YYYY HH:mm')
          obj.total = Global.createOptions(obj.total)
          obj.ttype = result(obj, 'ttype','Agio')
          users.child(obj.uid).once('value', function (usrs) {
            let usr = usrs.val()
            obj.user = result(usr, 'name', '')
            obj.type = orderType[obj.type]
            if (typeof obj.transfer_to_account !== 'undefined') {
              account.child(obj.transfer_to_account).once('value', function (acct) {
                let accts = acct.val()
                obj.account = accts.bank_name
                _this.tableData.push(obj)
              })
            } else {
              _this.tableData.push(obj)
            }
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
