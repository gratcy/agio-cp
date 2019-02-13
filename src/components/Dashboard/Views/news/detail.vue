<template>
	<div>
    <h3>{{name}} {{data.title}}</h3>
    <br>
    <div class='row'>
      <div class='card'>
        <div class='col-md-12'>
          <img :src="image" v-if="image !== ''" class="img-responsive" />
          <br>
          <div v-html="data.content" ></div>
        </div>
        <div class='col-md-3' v-show="event">
          <label>Date :</label>
          <p v-show="event">{{data.event_date}} {{data.jam}}</p>
          <br>
        </div>
        <div class='col-md-3' v-show="event">
          <label>Jam :</label>
          <p v-show="event">{{data.jam}}</p>
          <br>
        </div>
        <div class='col-md-3' v-show="event">
          <label>Venue</label>
          <p>{{data.place}}</p>
        </div>
        <br>
        <div class='col-md-3' v-show="event">
          <label>Available Seat</label>
          <p> {{data.seat}}</p>
        </div>
        &nbsp;
      </div>
    </div>
    <div class='row' v-show="event">
      <div class='card'>
        <div class='col-md-12'>
          <label >About Event :</label>
          <div v-html="data.content" ></div>
          <br>
        </div>
        &nbsp;
      </div>
    </div>
     <div class='row' v-show="event">
      <div class='card'>
        <h4 class="text-center">Event Attendance list </h4>
        <div class='col-md-12'>
          <v-client-table :data="tableData" :columns="columns" name="dt" :options="options" v-if="event == true">
          </v-client-table>
        </div>
        &nbsp;
      </div>
    </div>
	</div>
</template>
<script>
import Firebase from 'firebase'
// import Select from './Select.vue'
import Delete from './Delete.vue'
export default{
  data () {
    return {
      data: {},
      news: false,
      event: false,
      name: '',
      image: '',
      columns: ['name', 'email', 'nohp', 'status', 'seats', 'action'],
      tableData: [],
      options: {
        templates: {
          action: Delete
        },
        headings: {
          status: 'Tiket'
        }
      }
    }
  },
  created: function () {
    this.data = this.$session.get('view')
    if (typeof this.data.image !== 'undefined') {
      this.image = this.data.image
    }

    if (this.data.type === 'event') {
      this.event = true
      this.data.event_date = this.$moment(this.data.event_date).format('DD MMM YYYY')
      this.news = false
      this.name = 'Event:'
    } else if (this.data.type === 'news') {
      this.event = false
      this.news = true
    } else {
      this.event = false
      this.news = false
    }
    this.getuser()
  },
  methods: {
    getuser () {
      let _this = this
      Firebase.database().ref('registerevent').orderByChild('event_key').equalTo(this.data.key).on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          Firebase.database().ref('payments/' + obj.payment_key).on('value', function (val) {
            if (val.val().status === 'done') {
              obj.status = val.val().order_id
            } else {
              obj.status = 'unpaid'
            }
            _this.tableData.push(obj)
          })
        }
      })
    }
  }
}
</script>
