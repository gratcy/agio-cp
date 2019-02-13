<template>
  <div class="row">
      <div class="col-md-12">
        <div class='card'>
          <router-link to="/accounts/add">
            <v-btn class="pull-right"><i class="ti-plus"></i> Account</v-btn>
          </router-link>
          <v-client-table :data="tableData" :columns="columns" name="dt" :options="options">
          </v-client-table>
        </div>
      </div>

    </div>
</template>
<script>
import Firebase from 'firebase'
import Action from './Action.vue'
export default {
  data () {
    return {
      columns: ['bank_name', 'number', 'owner_name', 'action'],
      tableData: [],
      options: {
        templates: {
          action: Action
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
      Firebase.database().ref('accounts').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.tableData = []
        for (let key in dt) {
          let obj = dt[key]
          obj.key = key
          _this.tableData.push(obj)
        }
      })
    }
  }
}
</script>
<style>

</style>
