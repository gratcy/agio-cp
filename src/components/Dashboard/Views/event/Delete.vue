<template>
	<div>
    <v-btn @click="del"><i class="ti-trash"></i></v-btn>
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
    del () {
      Firebase.database().ref('registerevent/' + this.data.key).remove()
    }
  }
}
</script>
