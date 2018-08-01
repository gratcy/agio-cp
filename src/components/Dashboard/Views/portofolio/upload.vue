<template>
	<div>
    <a :href="data.result" target="_blank" v-if="portofolio == true">
      <v-btn>View Checkup Result</v-btn>  <br><br>
    </a>
    <span v-if="portofolio == true"> Analyst by <b>{{this.data.analisname}}</b></span>
    <v-btn @click="dialog = !dialog" v-if="portofolio == false">Add Checkup</v-btn>
    <div v-show="dialog">
      <br>
      <label>Pick Analyst</label>
      <select class="form-control" v-model="useranalis" @change="doAnalis">
        <option value="">-- Choose one --</option>
        <option v-for="item in analis" v-bind:key="item.value" :value="item.value">{{item.text}}</option>
      </select>
      <br>
      <label>Pick File Checkup</label>
      <select class="form-control" v-model="filename" @change="doChange">
        <option value="">-- Pick File --</option>
        <option v-for="item in files" v-bind:key="item.url" :value="item.url">{{item.name}}</option>
      </select>
      <br>
      <label>Or Upload New Checkup</label>
      <input type="file" name="" class="form-control" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length">
    </div>
	</div>
</template>
<script>
import Firebase from 'firebase'
import Global from '../global'
export default{
  data () {
    return {
      e1: '',
      portofolio: false,
      dialog: false,
      files: [],
      filename: '',
      analis: [],
      useranalis: ''
    }
  },
  props: ['data'],
  created: function () {
    if (typeof (this.data.result) !== 'undefined' && this.data.result !== '') {
      this.portofolio = true
    } else {
      this.portofolio = false
    }
    this.initializeFile()
    this.analiss()
    if (typeof this.data.analis !== 'undefined' && this.data.analis !== '') {
      this.useranalis = this.data.analis
    }
  },
  methods: {
    edit () {
      Firebase.database().ref('users/' + this.data.key).update({status: this.data.Status})
    },
    analiss () {
      let _this = this
      Firebase.database().ref('users').orderByChild('level').equalTo('analis').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.analis = []
        for (let key in dt) {
          let obj = dt[key]
          _this.analis.push({text: obj.name, value: key})
        }
      })
    },
    filesChange (fieldName, fileList) {
      let _this = this
      let storage = Firebase.storage()
      let storageRef = storage.ref()
      let tangRef = storageRef.child('portofolio/' + fileList[0].name)
      tangRef.put(fileList[0]).then(function (snapshot) {
        let newPostKey = Firebase.database().ref('file').push().key
        Firebase.database().ref('portFolioCheckupfile/' + newPostKey).update({url: snapshot.downloadURL, name: fileList[0].name})
        Firebase.database().ref('portofolio_checkup/' + _this.data.key).update({result: snapshot.downloadURL, status: 'done'})
        Global.notifPortofolioWithticker(_this.data.key, _this.data.uid)
        _this.dialog = false
        location.reload(1)
      })
    },
    initializeFile () {
      let _this = this
      Firebase.database().ref('portFolioCheckupfile').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.files = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          _this.files.push(obj)
        }
      })
    },
    doChange () {
      let _this = this
      if (this.filename !== '') {
        Firebase.database().ref('portofolio_checkup/' + _this.data.key).update({result: this.filename, status: 'done'}).then(function () {
          Global.notifPortofolioWithticker(_this.data.key, _this.data.uid)
          _this.data.portofolio = _this.filename
          _this.portofolio = true
          _this.filename = ''
          _this.dialog = false
          // location.reload(1)
        }).catch(function (error) {
          alert('Data could not be saved.' + error)
        })
      }
    },
    doAnalis () {
      Firebase.database().ref('portofolio_checkup/' + this.data.key).update({analis: this.useranalis})
    }
  }
}
</script>
