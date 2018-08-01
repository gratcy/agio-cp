<template>
	<div class="card">
    <div class="form-group">
      <label>Ticker Label</label>
      <input type="text" name="" placeholder="ADHI" v-model="data.name" class="form-control border-input" @keyup="setEnable()">
    </div>
    <div class="form-group">
      <label>Institution Name</label>
      <input type="text" name="" placeholder="PT ADHI KARYA" v-model="data.institusi" class="form-control border-input" @keyup="setEnable()">
    </div>
    <div class="form-group">
      <label>Portofolio Check up Price</label>
      <input type="text" name="" placeholder="25000" v-model="amt" class="form-control border-input" @keyup="amtval()">
    </div>    
    <div class="text-center">
      <v-btn class="btn btn-info btn-fill btn-wd" @click="submit" :disabled="button">Submit</v-btn>
    </div>
  </div>
</template>
<script>
  import Firebase from 'firebase'
  import Global from '../global'
  export default{
    data () {
      return {
        data: {},
        type: 'create',
        button: true,
        amt: ''
      }
    },
    created: function () {
      let data = this.$session.has('edit')
      if (data !== false) {
        this.data = this.$session.get('edit')
        this.amt = Global.createOptions(this.data.price)
        this.type = 'edit'
      } else {
        this.data = {}
        this.type = 'create'
        this.amt = ''
      }
      this.setEnable()
    },
    methods: {
      submit () {
        if (this.type === 'create') {
          let timestamp = Date.now()
          this.data.created_at = timestamp
          this.data.updated_at = timestamp
          this.data.price = parseFloat(this.data.price)
          let newPostKey = Firebase.database().ref('stocks').push().key
          Firebase.database().ref('stocks/' + newPostKey).set(this.data)
          this.data = {}
          this.$router.push('/ticker')
        } else if (this.type === 'edit') {
          let timestamp = Date.now()
          this.data.updated_at = timestamp
          this.data.price = parseFloat(this.data.price)
          let key = this.data.key
          delete this.data.key
          Firebase.database().ref('stocks/' + key).set(this.data)
          this.data = {}
          this.$router.push('/ticker')
        }
      },
      setEnable () {
        if (typeof this.data.name !== 'undefined' && typeof this.data.institusi !== 'undefined' && typeof this.data.price !== 'undefined') {
          if (this.data.name !== '' && this.data.institusi !== '' && this.data.price !== '') {
            this.button = false
          } else {
            this.button = true
          }
        } else {
          this.button = true
        }
      },
      amtval () {
        let real = this.amt.split('.').join('')
        let amtnumber = Global.createOptions(real)
        this.data.price = real
        this.amt = amtnumber
        this.setEnable()
      }
    }
  }
</script>
