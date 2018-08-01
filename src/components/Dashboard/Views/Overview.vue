<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards" v-bind:key="stats">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-xs-12">
        <div class='card'>
          <vue-chartist :data="usersChart.data" type="Bar"></vue-chartist>
        </div>
      </div>
    </div>
    

  </div>
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import Firebase from 'firebase'
  import VueChartist from 'v-chartist'
  export default {
    components: {
      StatsCard,
      'vue-chartist': VueChartist
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-user',
            title: 'User',
            value: '-',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-pencil',
            title: 'News',
            value: '-',
            footerText: 'Last day',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-gift',
            title: 'PriceAction',
            value: '-',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer'
          },
          {
            type: 'info',
            icon: 'ti-check-box',
            title: 'PortoCheckUp',
            value: '-',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          }
        ],
        usersChart: {
          data: {
            labels: [],
            series: []
          }
        }
      }
    },
    created: function () {
      this.getChart()
      this.getUsers()
      this.getPriceAction()
      this.getNews()
      this.getPortofolio()
      // console.log(this.$global.createOptions())
    },
    methods: {
      getChart () {
        let _this = this
        this.usersChart.data.labels = []
        let val = []
        Firebase.database().ref('signals').on('value', function (snapshot) {
          let dt = snapshot.val()
          for (let key in dt) {
            let obj = dt[key]
            _this.usersChart.data.labels.push(obj.name)
            val.push(obj.value) // obj.value
          }
        })
        this.usersChart.data.series.push(val)
      },
      getUsers () {
        let _this = this
        Firebase.database().ref('users').on('value', function (snapshot) {
          let dt = snapshot.val()
          _this.statsCards[0].value = Object.keys(dt).length
        })
      },
      getPriceAction () {
        let _this = this
        Firebase.database().ref('signals').on('value', function (snapshot) {
          let dt = snapshot.val()
          _this.statsCards[2].value = Object.keys(dt).length
        })
      },
      getNews () {
        let _this = this
        Firebase.database().ref('news').on('value', function (snapshot) {
          let dt = snapshot.val()
          _this.statsCards[1].value = Object.keys(dt).length
        })
      },
      getPortofolio () {
        let _this = this
        Firebase.database().ref('portofolio_checkup').orderByChild('status').equalTo('done').on('value', function (usrs) {
          _this.statsCards[3].value = usrs.numChildren()
        })
      }
    }
  }

</script>
<style>

</style>
