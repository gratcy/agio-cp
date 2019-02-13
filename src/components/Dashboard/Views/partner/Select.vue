<template>
	<div>
		<select class="form-control" v-model="data.Status" @change="edit">
    <option value="active">active</option>
    <option value="inactive">inactive</option>  
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
      Firebase.database().ref('users/' + this.data.key).update({status: this.data.Status})
    }
  }
}
</script>
