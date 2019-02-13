<template>
	<div>
		<select class="form-control" v-model="data.status" @change="edit">
    <option value="approved">approved</option>
    <option value="inactive">pending</option>
    <option value="waitpayment">waitpayment</option>  
    <option value="reject">reject</option>  
    </select>
	</div>
</template>
<script>
import Firebase from 'firebase'
export default{
  data () {
    return {
      e1: ''
    }
  },
  props: ['data'],
  methods: {
    edit () {
      Firebase.database().ref('registerevent/' + this.data.key).update({status: this.data.status})
    }
  }
}
</script>
