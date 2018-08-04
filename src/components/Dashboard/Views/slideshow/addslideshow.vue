<template>
	<div>
    <div class="card">
      <div class="form-group">
        <label>Choose Type</label>
        <select class="form-control" v-model="data.type" @change="validate">
          <option value="image">image</option>
          <option value="video">video</option>
        </select>  
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" name="" placeholder="Image Title" v-model="data.title" class="form-control" v-show="image">
        <input type="text" name="" placeholder="Video Title" v-model="data.title" class="form-control" v-show="video">

      </div>
      <div class="row form-group" v-show="video">
        <div class="col-lg-12">
        <label>Youtube URL</label>
        <textarea id="YoutubeEmbed" v-model="data.data" @change="youtubeChage()" placeholder="Youtube URL" class="form-control" :rows="3" :max-rows="6">
        </textarea>
        </div>
        <div class="col-lg-12">
        <label>View</label>
        <iframe width="560" height="315" v-bind:src="data.ytEmbed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
      <div class="form-group" v-show="image">
        <label>Link</label>
        <input type="text" name="" placeholder="Link" v-model="data.link" class="form-control">

      </div>
      <div class="row form-group" v-show="image">
        <div class="col-lg-12">
        <label>Upload Image</label>
        <input type="file" name="images" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
              accept="image/*" class="input-file form-control">
        </div>
        <br />
        <div class="col-lg-12">
        <label>View</label>
        <img v-bind:src="data.data" width="30%" v-bind:alt="data.title">
        </div>
      </div>
      <br>

      <div class="form-group col-lg-4" v-show="button">
          <i class="fa fa-spinner fa-spin"></i>
      </div>
      <br>
      <div class="text-center">
      <v-btn class="btn btn-info btn-fill btn-wd" @click="submit" :disabled="button">Submit</v-btn>
      </div>
    </div>
	</div>
</template>
<script>
import Firebase from 'firebase'
export default{
  data () {
    return {
      isSaving: false,
      data: {},
      image: false,
      video: false,
      type: 'create',
      button: false
    }
  },
  created: function () {
    let data = this.$session.has('edit')
    if (data !== false) {
      this.data = this.$session.get('edit')
      let yt = this.data.data
      yt = yt.split('=') 
      this.data.ytEmbed = 'https://www.youtube.com/embed/' + yt[1]
      this.type = 'edit'
      if (this.data.type === 'image') {
        this.image = true
        this.video = false
      } else if (this.data.type === 'video') {
        this.image = false
        this.video = true
      } else {
        this.image = false
        this.video = false
      }
    } else {
      this.data = {}
      this.type = 'create'
    }
  },
  methods: {
    submit () {
      if (this.type === 'create') {
        this.data.order = -1
        let now = Date.now()
        this.data.created_at = now
        this.data.updated_at = now
        let newPostKey = Firebase.database().ref('slideshow').push().key
        Firebase.database().ref('slideshow/' + newPostKey).set(this.data)
        this.data = {}
        this.$router.push('/slideshow')
      } else if (this.type === 'edit') {
        let now = Date.now()
        this.data.updated_at = now
        let key = this.data.key
        delete this.submit.key
        Firebase.database().ref('slideshow/' + key).set(this.data)
        this.data = {}
        this.type = 'created'
        this.$router.push('/slideshow')
      }
    },
    filesChange (fieldName, fileList) {
      let _this = this
      this.button = true
      let storage = Firebase.storage()
      let storageRef = storage.ref()
      let name = Date.now()
      let tangRef = storageRef.child('images/' + name + '.png')
      tangRef.put(fileList[0]).then(function (snapshot) {
        _this.button = false
        _this.isSaving = true
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          _this.data.data = downloadURL
        })
      })
    },
    validate () {
      if (this.data.type === 'image') {
        this.image = true
        this.video = false
      } else if (this.data.type === 'video') {
        this.image = false
        this.video = true
      } else {
        this.image = false
        this.video = false
      }
    },
    youtubeChage () {
        let yt = this.data.data
        yt = yt.split('=')

        this.data.ytEmbed = 'https://www.youtube.com/embed/' + yt[1]
    }
  }
}
</script>
