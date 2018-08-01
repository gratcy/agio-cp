<template>
	<div>
		<v-btn @click="edit" :disabled="dis"><i class="ti-eye"></i></v-btn>
	</div>
</template>
<script>
import Firebase from 'firebase'
export default{
  data () {
    return {
      dis: false
    }
  },
  created: function () {
    this.cek()
  },
  props: ['data'],
  methods: {
    edit () {
      let _this = this
      Firebase.database().ref('confirmations').orderByChild('payment_key').equalTo(this.data.key).once('value', function (snapshot) {
        let dt = snapshot.val()
        if (snapshot.exists()) {
          for (let key in dt) {
            _this.$session.set('detail', dt[key])
            _this.$router.push('/order/confirmation')
          }
        }
      })
    },
    cek () {
      let _this = this
      Firebase.database().ref('confirmations').orderByChild('payment_key').equalTo(this.data.key).once('value', function (snapshot) {
        if (!snapshot.exists()) {
          _this.dis = true
        }
      })
    }
  }
}
</script>
