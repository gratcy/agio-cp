<template>
	<div>
		<select class="form-control" v-model="data.notification_news" @change="edit">
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
      Firebase.database().ref('users/' + this.data.key).update({notification_news: this.data.notification_news})
    }
  }
}
</script>
