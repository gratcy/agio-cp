<template>
	<div>
    <div class="form-group">
      <label>Bank Name</label>
      <input type="text" name="" placeholder="BCA" v-model="data.bank_name" class="form-control border-input" @keyup="setEnable()">
    </div>
    <div class="form-group">
      <label>Account Number</label>
      <input type="text" name="" placeholder="1379129031" v-model="data.number" class="form-control border-input" @keyup="setEnable()">
    </div>
    <div class="form-group">
      <label>Account Name</label>
      <input type="text" name="" placeholder="PT AGIO SEMESTA ALAM" v-model="data.owner_name" class="form-control border-input" @keyup="setEnable()">
    </div>
    <div class="text-center">
      <v-btn class="btn btn-info btn-fill btn-wd" @click="submit" :disabled="button">Submit</v-btn>
    </div>
  </div>
</template>
<script>
  import Firebase from 'firebase'
  export default{
    data () {
      return {
        data: {},
        type: 'create',
        button: true
      }
    },
    created: function () {
      let data = this.$session.has('edit')
      if (data !== false) {
        this.data = this.$session.get('edit')
        this.type = 'edit'
      } else {
        this.data = {}
        this.type = 'create'
      }
      this.setEnable()
    },
    methods: {
      submit () {
        if (this.type === 'create') {
          let timestamp = Date.now()
          this.data.created_at = timestamp
          this.data.updated_at = timestamp
          let newPostKey = Firebase.database().ref('accounts').push().key
          Firebase.database().ref('accounts/' + newPostKey).set(this.data)
          this.data = {}
          this.$router.push('/accounts')
        } else if (this.type === 'edit') {
          let timestamp = Date.now()
          this.data.updated_at = timestamp
          let key = this.data.key
          delete this.submit.key
          Firebase.database().ref('accounts/' + key).set(this.data)
          this.data = {}
          this.$router.push('/setting')
        }
      },
      setEnable () {
        if (typeof this.data.bank_name !== 'undefined' && typeof this.data.number !== 'undefined' && typeof this.data.owner_name !== 'undefined') {
          if (this.data.bank_name !== '' && this.data.number !== '' && this.data.owner_name !== '') {
            this.button = false
          } else {
            this.button = true
          }
        } else {
          this.button = true
        }
      }
    }
  }
</script>
