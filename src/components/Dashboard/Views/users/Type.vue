<template>
	<div>
		<select class="form-control" v-model="data.type" @change="edit">
    <option value="">Pilih tipe</option>
    <option value="member">Member</option>
    <option value="partner">Partner</option>
    <option value="admin">Admin</option>
    <option value="analis">Analis</option>  
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
      let confirms = confirm('are you sure to do this?')
      if (confirms) {
        Firebase.database().ref('users/' + this.data.key).update({level: this.data.type})
      }
    }
  }
}
</script>
