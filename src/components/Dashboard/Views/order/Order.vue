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
import Select from './Status.vue'
import View from './View.vue'
import Global from '../global'
export default {
  data () {
    return {
      columns: ['order_id', 'created_at', 'type', 'total', 'user', 'status', 'account', 'Confirmation'],
      tableData: [],
      options: {
        templates: {
          status: Select,
          Confirmation: View
        },
        headings: {
          order_id: 'Order ID',
          created_at: 'Created At',
          type: 'Type',
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
      let _this = this
      let users = Firebase.database().ref().child('users')
      let account = Firebase.database().ref().child('accounts')
      Firebase.database().ref('payments').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          obj.created_at = _this.$moment(obj.created_at).format('DD MMM YYYY HH:mm')
          obj.total = Global.createOptions(obj.total)
          users.child(obj.uid).once('value', function (usrs) {
            let usr = usrs.val()
            obj.user = usr.name
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
      })
    }
  }
}
</script>
<style>

</style>
