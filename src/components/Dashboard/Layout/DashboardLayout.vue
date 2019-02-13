<template>
  <div class="wrapper">

    <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks">

    </side-bar>
    <notifications>

    </notifications>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import Firebase from 'firebase'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    mounted: function () {
      let _this = this
      Firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          _this.$router.push('/login')
        }
      })
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
