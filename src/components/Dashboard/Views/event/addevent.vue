<template>
	<div>
    <div class="card">
      <div class="form-group" style="display: none;">
        <label>Choose Type</label>
        <select class="form-control" v-model="data.type" @change="validate">
          <option value="news">news</option>
          <option value="event" selected>event</option>
        </select>  
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" name="" placeholder="News Title" v-model="data.title" class="form-control" v-show="news">
        <input type="text" name="" placeholder="Event name" v-model="data.title" class="form-control" v-show="event">
      </div>
      <div class="row form-group" v-show="event">
        <div class="col-lg-4">
        <label>Date</label>
          <datepicker v-model="data.event_date" :format="customFormatter" class="form-control" placeholder=""></datepicker>
        </div>
        <div class="col-lg-4">
          <label>Start at :</label>
          <Timepicker v-model="timepicker" :options="pickerSetting"  class="form-control" ></Timepicker>
        </div>
        <div class="col-lg-4">
          <label>Till at :</label>
          <Timepicker v-model="timepicker2" :options="pickerSetting"  class="form-control" ></Timepicker>
        </div>
      </div>
      <br>
      <div class="row form-group" v-show="event">
        <div class="col-lg-4">
          <label>Ticket Price / Person</label>
          <input type="text" name="" placeholder="200000" v-model="data.htm" class="form-control">
        </div>
        <div class="col-lg-4">
          <label>Venue</label>
          <input type="text" name="" placeholder="Heaven Place" v-model="data.place" class="form-control">
        </div>
        <div class="col-lg-4">
          <label>Available Seat</label>
          <input type="number" name="" placeholder="10" v-model="data.seat" class="form-control">
        </div>
      </div>

      <div class="form-group">
        <label>Content</label>
        <vue-editor id="editor" v-model="data.content" useCustomImageHandler
        @imageAdded="handleImageAdded"></vue-editor>
      </div>
      <div class="form-group col-lg-12">
        <div class="col-lg-2">
          <label>Slide Type I</label>
          <select class="form-control" v-model="data.slides[0].type" @change="validateSlide">
            <option value="image">Image</option>
            <option value="youtube">Youtube</option>
          </select>
        </div>
        <div class="col-lg-5" v-show="slideImg">
          <label>Upload Image I</label>
          <input type="file" multiple name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file form-control">
          <br />
          <img v-bind:src="data.slides[0].data" id="slideData" width="30%">
        </div>
        <div class="col-lg-5" v-show="slideYt">
          <label>Youtube URL I</label>
          <textarea placeholder="Youtube URL Script" v-model="data.slides[0].data" @change="youtubeChage()" class="form-control" :rows="3" :max-rows="6">
          </textarea>
          <br />
          <iframe width="560" height="315" v-bind:src="data.slides[0].dataYT" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
      <div class="form-group col-lg-12">
        <div class="col-lg-2">
          <label>Slide Type II</label>
          <select class="form-control" v-model="data.slides[1].type" @change="validateSlide2">
            <option value="image">Image</option>
            <option value="youtube">Youtube</option>
          </select>
        </div>
        <div class="col-lg-5" v-show="slideImg2">
          <label>Upload Image II</label>
          <input type="file" multiple name="uploadFieldName2" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file form-control">
          <br />
          <img v-bind:src="data.slides[1].data" id="slideData2" width="30%">
        </div>
        <div class="col-lg-5" v-show="slideYt2">
          <label>Youtube URL II</label>
          <textarea placeholder="Youtube URL Script" v-model="data.slides[1].data" @change="youtubeChage2()" class="form-control" :rows="3" :max-rows="6">
          </textarea>
          <br />
          <iframe width="560" height="315" v-bind:src="data.slides[1].dataYT" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
      <div class="form-group col-lg-12">
        <div class="col-lg-2">
          <label>Slide Type III</label>
          <select class="form-control" v-model="data.slides[2].type" @change="validateSlide3">
            <option value="image">Image</option>
            <option value="youtube">Youtube</option>
          </select>
        </div>
        <div class="col-lg-5" v-show="slideImg3">
          <label>Upload Image III</label>
          <input type="file" multiple name="uploadFieldName3" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file form-control">
          <br />
          <img v-bind:src="data.slides[2].data" id="slideData3" width="30%">
        </div>
        <div class="col-lg-5" v-show="slideYt3">
          <label>Youtube URL III</label>
          <textarea placeholder="Youtube URL Script" v-model="data.slides[2].data" @change="youtubeChage3()" class="form-control" :rows="3" :max-rows="6">
          </textarea>
          <br />
          <iframe width="560" height="315" v-bind:src="data.slides[2].dataYT" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
      <div class="form-group col-lg-4" v-show="button">
          <i class="fa fa-spinner fa-spin"></i>
      </div>
      <br>
      <div class="form-group" v-show="news">
        <label>Tag</label>
        <tags-input element-id="dataTags" id="dataTags" v-model="data.tag" class="form-control"></tags-input>
      </div>
      <div class="text-center">
      <v-btn class="btn btn-info btn-fill btn-wd" @click="submit" :disabled="button">Submit</v-btn>
      </div>
    </div>
	</div>
</template>
<script>
import Vue from 'vue'
import VoerroTagsInput from '@voerro/vue-tagsinput';
import _ from 'lodash'
import Firebase from 'firebase'
import { VueEditor } from 'vue2-editor'
import Datepicker from 'vuejs-datepicker'
import Timepicker from 'vue-simple-timepicker'
Vue.component('tags-input', VoerroTagsInput);
export default{
  data () {
    return {
      isSaving: false,
      data: {},
      event: false,
      news: false,
      type: 'create',
      button: false,
      timepicker: {
        hours: 0,
        minutes: 0
      },
      timepicker2: {
        hours: 0,
        minutes: 0
      },
      pickerSetting: {
        headerShow: false
      },
      slideImg: false,
      slideYt: false,
      slideImg2: false,
      slideYt2: false,
      slideImg3: false,
      slideYt3: false
    }
  },
  components: {
    VueEditor,
    Datepicker,
    Timepicker
  },
  created: function () {
    let data = this.$session.has('edit')
    if (data !== false) {
      this.data = this.$session.get('edit')
      if (!_.result(this.data, 'slides')) {
        this.data.slides = [
          {
            type: 'image',
            data: '',
            dataYT: ''
          },
          {
            type: 'image',
            data: '',
            dataYT: ''
          },
          {
            type: 'image',
            data: '',
            dataYT: ''
          }
        ]
      }

      this.data.tag = _.replace(this.data.tag, /\s/g, ',')

      this.data.type = _.toLower(_.result(this.data, 'type', 'news'))
      this.type = 'edit'
      if (this.data.slides[0].type === 'image') {
        this.slideImg = true
        this.slideYt = false
      } else {
        let yt = this.data.slides[0].data
        yt = yt.split('=')

        this.slideImg = false
        this.slideYt = true
        this.data.slides[0].dataYT = 'https://www.youtube.com/embed/' + yt[1]
      }

      if (this.data.slides[1].type === 'image') {
        this.slideImg2 = true
        this.slideYt2 = false
      } else {
        let yt = this.data.slides[1].data
        yt = yt.split('=')

        this.slideImg2 = false
        this.slideYt2 = true
        this.data.slides[1].dataYT = 'https://www.youtube.com/embed/' + yt[1]
      }

      if (this.data.slides[2].type === 'image') {
        this.slideImg3 = true
        this.slideYt3 = false
      } else {
        let yt = this.data.slides[2].data
        yt = yt.split('=')

        this.slideImg3 = false
        this.slideYt3 = true
        this.data.slides[2].dataYT = 'https://www.youtube.com/embed/' + yt[1]
      }

      if (this.data.type === 'news') {
        this.news = true
        this.event = false
      } else if (this.data.type === 'event') {
        let theDate = new Date(this.data.event_date)
        this.data.event_date = this.$moment(theDate.toGMTString()).format('YYYY-MM-DD')
        if (typeof this.data.jam !== 'undefined' && this.data.jam !== '') {
          let split = this.data.jam.split(' - ')
          let jam1 = split[0].split(':')
          this.timepicker.hours = jam1[0]
          this.timepicker.minutes = jam1[1]
          let jam2 = split[1].split(':')
          this.timepicker2.hours = jam2[0]
          this.timepicker2.minutes = jam2[1]
        }
        this.news = false
        this.event = true
      } else {
        this.news = false
        this.event = false
      }
    } else {
      this.data = {}
      this.jam1 = ''
      this.jam2 = ''
      this.type = 'create'
    }
  },
  methods: {
    submit () {
      if (this.type === 'create') {
        this.data.order = -1
        let now = Date.now()
        this.data.created_at = now
        if (this.timepicker.hours !== '' && this.timepicker.minutes !== '' && this.timepicker2.hours !== '' && this.timepicker2.minutes !== '') {
          this.data.jam = this.timepicker.hours + ':' + this.timepicker.minutes + ' - ' + this.timepicker2.hours + ':' + this.timepicker2.minutes
        }
        this.data.ttype = 'Agio'
        this.data.updated_at = now
        this.data.event_date = this.$moment(this.data.event_date).unix()
        this.data.htm = parseFloat(_.result(this.data, 'htm', 0))
        this.data.seat = parseFloat(_.result(this.data, 'seat', 0))
        let newPostKey = Firebase.database().ref('news').push().key
        Firebase.database().ref('news/' + newPostKey).set(this.data)
        this.data = {}
        this.$router.push('/event')
      } else if (this.type === 'edit') {
        let now = Date.now()
        this.data.updated_at = now
        if (this.timepicker.hours !== '' && this.timepicker.minutes !== '' && this.timepicker2.hours !== '' && this.timepicker2.minutes !== '') {
          this.data.jam = this.timepicker.hours + ':' + this.timepicker.minutes + ' - ' + this.timepicker2.hours + ':' + this.timepicker2.minutes
        }
        this.data.event_date = this.$moment(this.data.event_date).unix()
        this.data.htm = parseFloat(_.result(this.data, 'htm', 0))
        this.data.seat = parseFloat(_.result(this.data, 'seat',0))
        let key = this.data.key
        delete this.submit.key
        Firebase.database().ref('news/' + key).set(this.data)
        this.data = {}
        this.type = 'created'
        this.$router.push('/event')
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
          if (fieldName === 'uploadFieldName') {
            _this.data.slides[0] = {
              data: downloadURL
            }
          }
          if (fieldName === 'uploadFieldName2') {
            _this.data.slides[1] = {
              data: downloadURL
            }
          }
          if (fieldName === 'uploadFieldName3') {
            _this.data.slides[2] = {
              data: downloadURL
            }
          }
        })
      })
    },
    handleImageAdded: function (file, Editor, cursorLocation) {
      let storage = Firebase.storage()
      let storageRef = storage.ref()
      let name = Date.now()
      let tangRef = storageRef.child('images/' + name + '.png')
      tangRef.put(file).then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          Editor.insertEmbed(cursorLocation, 'image', downloadURL)
        })
      })
    },
    validate () {
      if (this.data.type === 'news') {
        this.news = true
        this.event = false
      } else if (this.data.type === 'event') {
        this.news = false
        this.event = true
      } else {
        this.news = false
        this.event = false
      }
    },
    validateSlide () {
      if (this.data.slides[0].type === 'image') {
        this.slideImg = true
        this.slideYt = false
      } else if (this.data.slides[0].type === 'youtube') {
        this.slideImg = false
        this.slideYt = true
      } else {
        this.slideImg = false
        this.slideYt = false
      }
    },
    validateSlide2 () {
      if (this.data.slides[1].type === 'image') {
        this.slideImg2 = true
        this.slideYt2 = false
      } else if (this.data.slides[1].type === 'youtube') {
        this.slideImg2 = false
        this.slideYt2 = true
      } else {
        this.slideImg2 = false
        this.slideYt2 = false
      }
    },
    validateSlide3 () {
      if (this.data.slides[2].type === 'image') {
        this.slideImg3 = true
        this.slideYt3 = false
      } else if (this.data.slides[2].type === 'youtube') {
        this.slideImg3 = false
        this.slideYt3 = true
      } else {
        this.slideImg3 = false
        this.slideYt3 = false
      }
    },
    customFormatter (date) {
      return this.$moment(date).format('YYYY-MM-DD')
    },
    youtubeChage () {
        let yt = this.data.slides[0].data
        yt = yt.split('=')

        this.data.slides[0].dataYT = 'https://www.youtube.com/embed/' + yt[1]
    },
    youtubeChage2 () {
        let yt = this.data.slides[1].data
        yt = yt.split('=')
        
        this.data.slides[1].dataYT = 'https://www.youtube.com/embed/' + yt[1]
    },
    youtubeChage3 () {
        let yt = this.data.slides[2].data
        yt = yt.split('=')
        
        this.data.slides[2].dataYT = 'https://www.youtube.com/embed/' + yt[1]
    }
  }
}
</script>
