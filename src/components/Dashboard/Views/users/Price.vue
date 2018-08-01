<template>
	<div>
		<select class="form-control" v-model="data.Price" @change="edit">
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
      Firebase.database().ref('users/' + this.data.key).update({price: this.data.Price})
    }
  }
}
</script>
