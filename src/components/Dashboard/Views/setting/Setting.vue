<template>
    <div class='row'>
      <div class='col-md-12'>
        <div class='card'>
          <div id="exTab1"> 
          <ul  class="nav nav-tabs">
                <li :class="satu">
                  <a  href="javascript:void(0)" @click="ganti('satu')" data-toggle="tab">Contact</a>
                </li>
                <li :class="dua">
                  <a href="javascript:void(0)" @click="ganti('dua')" data-toggle="tab">Pricing</a>
                </li>
                <li :class="tiga">
                  <a href="javascript:void(0)" @click="ganti('tiga')" data-toggle="tab">Account</a>
                </li>
              </ul>

                <div class="tab-content clearfix">
                  <div class="tab-pane" :class="satu" id="1a">
                    <br>
                    <form>
                      <div class="row">
                        <div class="col-md-8">
                          <fg-input 
                              type="email" 
                              label="Email"
                              placeholder="Email"
                              v-model="info.email">
                          </fg-input>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8">
                          <fg-input 
                              type="text" 
                              label="Handphone / Whatsapp"
                              v-model="info.wa_sms">
                          </fg-input>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8">
                          <fg-input 
                              type="text" 
                              label="Telp"
                              placeholder=""
                              v-model="info.telp">
                          </fg-input>
                        </div>
                      </div>
                      <div>
                        <a class="btn btn-info btn-fill btn-wd" href="javascript:void(0)" @click="submitinfo()">Update</a>
                      </div>
                      <div class="clearfix"></div>
                    </form>
                  </div>
                  <div class="tab-pane" id="2a" :class="dua">
                    <form style="padding:20px">
                      <div class="row">
                        <p>Monthly</p>
                        
                        <div class="col-md-4">
                          <fg-input type="text"
                                    label="Price"
                                    placeholder="25000"
                                    v-model="price.monthly.price">
                          </fg-input>
                        </div>
                        <div class="col-md-4">
                          <label>Status</label>
                          <select class="form-control" v-model="price.monthly.status">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <p>Quarterly</p>
                        
                        <div class="col-md-4">
                          <fg-input type="text"
                                    label="Price"
                                    placeholder="75000"
                                    v-model="price.quarterly.price">
                          </fg-input>
                        </div>
                        <div class="col-md-4">
                          <label>Status</label>
                          <select class="form-control" v-model="price.quarterly.status">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <p>Yearly</p>
                        <div class="col-md-4">
                          <fg-input type="text"
                                    label="Price"
                                    placeholder="120000"
                                    v-model="price.yearly.price">
                          </fg-input>
                        </div>
                        <div class="col-md-4">
                          <label>Status</label>
                          <select class="form-control" v-model="price.yearly.status">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <a class="btn btn-info btn-fill btn-wd" href="javascript:void(0)" @click="submitprice()">Update</a>
                      </div>
                      <div class="clearfix"></div>
                    </form>
                  </div>
                  <div class="tab-pane" id="3a" :class="tiga">
                    <br>
                    <router-link to="/setting/accounts/add">
                      <v-btn class="pull-right"><i class="ti-plus"></i> Account</v-btn>
                    </router-link>
                    <v-client-table :data="tableData" :columns="columns" name="dt" :options="options">
                    </v-client-table>
                  </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import Firebase from 'firebase'
import Setting from '../Setting'
import Action from '../account/Action.vue'
export default {
  data () {
    return {
      satu: 'active',
      dua: '',
      tiga: '',
      info: {},
      price: {},
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
    this.definedataAcct()
    this.$session.remove('edit')
  },
  methods: {
    definedata () {
      let _this = this
      Firebase.database().ref('settings').on('value', function (snapshot) {
        let dt = snapshot.val()
        _this.info = dt.info
        _this.price = dt.membership.premium
      })
    },
    definedataAcct () {
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
    },
    ganti (index) {
      if (index === 'satu') {
        this.satu = 'active'
        this.dua = ''
        this.tiga = ''
      } else if (index === 'dua') {
        this.satu = ''
        this.dua = 'active'
        this.tiga = ''
      } else if (index === 'tiga') {
        this.satu = ''
        this.dua = ''
        this.tiga = 'active'
      }
    },
    submitinfo () {
      Setting.saveInfo(this.info)
      this.definedata()
    },
    submitprice () {
      this.price.monthly.price = parseFloat(this.price.monthly.price)
      this.price.quarterly.price = parseFloat(this.price.quarterly.price)
      this.price.yearly.price = parseFloat(this.price.yearly.price)
      Setting.saveprice(this.price)
      this.definedata()
    }
  }
}
</script>
<style>

</style>
