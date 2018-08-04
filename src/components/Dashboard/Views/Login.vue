<template>
  <div>
  <notifications>

  </notifications>
  <center>
  <div class="card card-user" style="width:400px;">
    <div class="image">
      <img src="static/img/background.jpg" alt="...">
    </div>
    <div class="content">
      <div class="author">
        
        <h4 class="title">Chet Faker
          <br>
          <a href="#">
            <small>@chetfaker</small>
          </a>
        </h4>
      </div>
      <p class="description text-center" style="padding-top:30px">
        <fg-input type="email"
          placeholder="Email"
          v-model = "data.username">
        </fg-input>
        <fg-input type="password"
          placeholder="password"
          v-model = "data.password">
        </fg-input>
        <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="dologin">
            Login
        </button>
      </p>
    </div>
    <hr>
  </div>
  </center>
</div>
</template>
<script>
import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import PaperNotification from 'src/components/UIComponents/NotificationPlugin/Notification.vue'
Vue.use(VueFire)
let config = {
}

Firebase.initializeApp(config)
let db = Firebase.database()
export default {
  data () {
    return {
      data: {},
      type: ['', 'info', 'success', 'warning', 'danger'],
      notifications: {
        topCenter: false
      }
    }
  },
  components: {
    PaperNotification
  },
  firebase: {
    users: db.ref('users')
  },
  methods: {
    dologin () {
      let _this = this
      Firebase.auth().signInWithEmailAndPassword(this.data.username, this.data.password).then(function (sys) {
        Firebase.database().ref('users')
        .orderByChild('email')
        .equalTo(_this.data.username)
        .on('child_added', function (snapshot) {
          if (snapshot.val().level === 'admin') {
            _this.$router.push('/dashboard')
          } else {
            _this.$notifications.notify(
              {
                message: 'Anda bukan Administrator',
                icon: 'ti-info',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
          }
        })
      }).catch(function (error) {
        console.log(error.message)
        _this.$notifications.notify(
          {
            message: error.message,
            icon: 'ti-info',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
      })
    }
  }
}
</script>
