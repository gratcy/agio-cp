<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <router-link to="/event/add">
            <v-btn class="pull-right"><i class="ti-plus"></i> Add Event</v-btn>
          </router-link>
          <v-client-table :data="tableData" :columns="columns" name="dt" :options="options">
          </v-client-table>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import Firebase from 'firebase'
import Content from './content.vue'
import Global from '../global'

export default {
  data () {
    return {
      columns: ['Type', 'create','Event Date', 'name', 'venue', 'seat', 'Price', 'Action'],
      tableData: [],
      options: {
        templates: {
          Action: Content,
          headings: {
            create: 'Created at',
            title: 'Title',
            place: 'Venue'
          }
        }
      }
    }
  },
  mounted: function () {
    this.definedata()
    this.$session.remove('edit')
  },
  methods: {
    definedata () {
      let _this = this
      Firebase.database().ref('news').orderByChild('type').equalTo('event').on('value', function (snapshot) {
        let dt = snapshot.val()
        dt = Global.__sort_object(dt)
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          obj['name'] = obj.title
          obj['venue'] = obj.place
          obj.create = _this.$moment(obj.created_at).format('DD/MM/YY HH:mm')
          obj['Type'] = obj.ttype || 'Agio'
          obj['Price'] = Global.createOptions(obj.htm)
          obj['Event Date'] = _this.$moment(obj.event_date).format('DD/MM/YY')
          _this.tableData.push(obj)
        }
      })
    }
  }
}
</script>
<style>

</style>
