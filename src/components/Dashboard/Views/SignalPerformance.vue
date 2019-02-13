<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <router-link to="/signal-performance/add">
            <v-btn class="pull-right"><i class="ti-plus"> </i> Signal </v-btn>
          </router-link>
          <v-client-table :data="tableData" :columns="columns" name="dt" :options="options">
            <template slot="edit" slot-scope="props">
              <div>
                <a class="fa fa-edit" :href="edit(props.row.id)"></a>
              </div>
            </template>
          </v-client-table>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import Firebase from 'firebase'
import Button from './signal/button.vue'
export default {
  data () {
    return {
      columns: ['ticker', 'return', 'score', 'action'],
      tableData: [],
      options: {
        templates: {
          action: Button
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
      Firebase.database().ref('signals').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          _this.tableData.push({ ticker: obj.name, name: obj.name, return: obj.value, value: obj.value, score: obj.score, key: key, tickerKey: obj.tickerKey })
        }
      })
    }
  }
}
</script>
<style>

</style>
