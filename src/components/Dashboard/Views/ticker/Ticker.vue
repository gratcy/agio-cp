<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <router-link to="/ticker/add">
            <v-btn class="pull-right"><i class="ti-plus"></i> Stock</v-btn>
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
import Button from './Button.vue'
import Global from '../global'
export default {
  data () {
    return {
      columns: ['name', 'institusi', 'price', 'action'],
      tableData: [],
      options: {
        templates: {
          action: Button
        },
        headings: {
          name: 'Ticker',
          institusi: 'Institusi',
          price: 'Portofolio Check up Price'
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
      Firebase.database().ref('stocks').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          obj.price = Global.createOptions(obj.price)
          _this.tableData.push(obj)
        }
      })
    }
  }
}
</script>
<style>

</style>
