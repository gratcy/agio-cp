<template>
	<div>
		<p>bank : {{data.bank}}</p><br>
    <p>name : {{data.name}}</p><br>
    <p>number : {{data.number}}</p>
	</div>
</template>
<script>
export default{
  data () {
    return {
      data: {}
    }
  },
  created: function () {
    this.data = this.$session.get('detail')
  }
}
</script>
