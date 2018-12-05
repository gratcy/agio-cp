<template>
	<div>
		<select class="form-control" v-model="data.status" @change="edit">
    <option value="waitforpayment">waitforpayment</option>
    <option value="confirmed">confirmed </option>  
    <option value="done">done</option>
    <option value="reject">reject</option>
    </select>
	</div>
</template>
<script>
import Firebase from 'firebase'
import Global from '../global'
export default{
  data () {
    return {
      e1: ''
    }
  },
  props: ['data'],
  methods: {
    edit () {
      if (this.data.status === 'done' && this.data.type === 'PremiumMembership' || this.data.status === 'done' && this.data.type.toLowerCase() === 'premium membership') {
        let _this = this
        Firebase.database().ref('subscription_history').orderByChild('payment_key').equalTo(this.data.key).on('child_added', function (snap) {
          let ayearlater = ''
          let now = _this.$moment().format('YYYY-MM-DD')
          if (snap.val().type === 'quarterly') {
            ayearlater = _this.$moment().add(3, 'months').format('YYYY-MM-DD')
          } else if (snap.val().type === 'monthly') {
            ayearlater = _this.$moment().add(1, 'months').format('YYYY-MM-DD')
          } else if (snap.val().type === 'yearly') {
            ayearlater = _this.$moment().add(1, 'years').format('YYYY-MM-DD')
          }
          Firebase.database().ref('users/' + _this.data.uid).update({expired: ayearlater, notification_price_action: 'active'})
          Firebase.database().ref('payments/' + _this.data.key).update({status: _this.data.status})
          Firebase.database().ref('users/' + _this.data.uid).once('value', function (val) {
            let body = 'Selamat ' + val.val().name + ' Anda telah berhasil berlangganan fitur Agio - Price Action selama 1 tahun ( ' + now + ' s/d' + ayearlater + ' )'
            if (typeof val.val().fcm !== 'undefined' && val.val().fcm !== '') {
              let message = {
                to: val.val().fcm,
                notification: {
                  code: 'NA002',
                  title: 'Langganan berhasil',
                  body: body
                }
              }
              Global.fcm(message)
            }
            let notif = {code: 'NA002', created_at: new Date().getTime(), message: body, status: 'unread', title: 'Langganan berhasil', type: 'PremiumMembership', updated_at: new Date().getTime(), order: new Date().getTime() * -1}
            Global.saveNotif(_this.data.uid, notif)
          })
        })
      } else if (this.data.status === 'done' && this.data.type.toLowerCase() === 'portofoliocheckup' || this.data.status === 'done' && this.data.type.toLowerCase() === 'portofolio checkup') {
        Firebase.database().ref('payments/' + this.data.key).update({status: this.data.status})
        Global.updatePortofolioPaidByPayment(this.data.key, this.data.uid)
      } else if (this.data.status === 'done' && this.data.type.toLowerCase() === 'event') {
        Firebase.database().ref('payments/' + this.data.key).update({status: this.data.status})
        Global.updateEventPaidByPayment(this.data.key, this.data.uid)
      }
    }
  }
}
</script>
