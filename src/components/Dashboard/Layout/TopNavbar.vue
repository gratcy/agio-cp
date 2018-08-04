<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="navbar-right-menu">
        <ul class="nav navbar-nav navbar-right" style="flex-direction: row;">
          <li class="open" @click="logout">
            <a href="#" class="btn-magnify" @click="logout">
              <i class="ti-power-off"></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import { upperFirst } from 'lodash'
  import Firebase from 'firebase'
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return upperFirst(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout () {
        let _this = this
        Firebase.auth().signOut().then(function () {
          _this.$router.push('/login')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }

</script>
<style>

</style>
