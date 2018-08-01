<template>
	<div>
		<select class="form-control" v-model="data.status" @change="edit">
    <option value="active">active</option>
    <option value="inactive">pending</option>
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
