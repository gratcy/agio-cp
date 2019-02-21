<template>
	<div>
    <a v-bind:href="data.payment_proof" target="_blank">View</a>
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
    
  },
  props: ['data'],
  methods: {
    
  }
}
</script>
