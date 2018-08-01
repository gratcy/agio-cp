<template>
	<div>
		<select class="form-control" v-model="data.status" @change="edit">
    <option value="paid">paid</option>
    <option value="pending">pending</option>  
    <option value="done">done</option>
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
      Firebase.database().ref('portofolio_checkup/' + this.data.key).update({status: this.data.status})
    }
  }
}
</script>
