<template>
	<div>
    <v-btn @click="edit"><i class="ti-pencil"></i></v-btn>
    <v-btn @click="del"><i class="ti-trash"></i></v-btn>
    <v-btn @click="view"><i class="ti-eye"></i></v-btn>
	</div>
</template>
<script>
import Firebase from 'firebase'
export default{
  props: ['data'],
  methods: {
    edit () {
      this.$session.set('edit', this.data)
      this.$router.push('news/edit')
    },
    del () {
      let dele = confirm('Yakin ingin menghapus?')
      if (dele) {
        Firebase.database().ref('news').child(this.data.key).remove()
        this.$router.push('/news')
      }
    },
    view () {
      this.$session.set('view', this.data)
      this.$router.push('/news/detail')
    }
  }
}
</script>
