<template>
	<div>
    <v-btn @click="edt"><i class="ti-pencil"></i></v-btn>
	</div>
</template>
<script>
export default{
  data () {
    return {
      e1: ''
    }
  },
  props: ['data'],
  methods: {
    edt () {
      this.$session.set('edit', this.data)
      this.$router.push('ticker/edit')
    }
  }
}
</script>
