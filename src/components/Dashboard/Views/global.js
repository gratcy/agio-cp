import Firebase from 'firebase'
export default {
  createOptions (value) {
    if (typeof value !== 'undefined') {
      if (value !== '') {
        value = value.toString().replace(/[A-Za-z]/g, '')
        if (value.slice(-1) === ',') {
          return value
        } else {
          value = parseFloat(value.replace(',', '.'))
          let val = (value / 1).toFixed(0).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }
      }
    }
  },
  __sort_object(obj) {
    let data = []
    Object.keys(obj).map(function(objectKey, index) {
      obj[objectKey].key = objectKey
      data.push(obj[objectKey])
    })

    data.sort(function(a, b) {
      return b.created_at - a.created_at
    })

    let dataFinal = {}
    for (let i = 0; i < data.length; ++i) {
      let key = data[i].key
      dataFinal[key] = data[i]
    }
    return dataFinal
  },
  fcm (message) {
    let FCM = require('fcm-push')
    let serverKey = ''
    let fcm = new FCM(serverKey)
    fcm.send(message)
    .then(function (response) {
      console.log('Successfully sent with response: ', response)
    })
    .catch(function (err) {
      console.log('Something has gone wrong!')
      console.error(err)
    })
  },
  saveNotif (uid, data) {
    let keywilluse = Firebase.database().ref('notifications/' + uid).push().key
    Firebase.database().ref('notifications/' + uid + '/' + keywilluse).set(data)
  },
  getTickerFromPortofolio (id) {
    let tickerstock = Firebase.database().ref().child('stocks')
    let ticker = []
    Firebase.database().ref('portofolio_checkup/' + id).once('value', function (snap) {
      if (typeof snap.val().tickers !== 'undefined' && snap.val().tickers.length > 0) {
        for (let i = 0; i < snap.val().tickers.length; i++) {
          tickerstock.child(snap.val().tickers[i]).once('value', function (stock) {
            ticker.push(stock.val().name)
            if (i === snap.val().tickers.length - 1) {
              return ticker.join(', ')
            }
          })
        }
      } else {
        return ''
      }
    })
  },
  updatePortofolioPaidByPayment (id, uid) {
    let _this = this
    let tickerstock = Firebase.database().ref().child('stocks')
    let ticker = []
    Firebase.database().ref('portofolio_checkup').orderByChild('payment_key').equalTo(id).on('child_added', function (snap) {
      Firebase.database().ref('portofolio_checkup/' + snap.key).update({status: 'paid'})
      if (typeof snap.val().tickers !== 'undefined' && snap.val().tickers.length > 0) {
        for (let i = 0; i < snap.val().tickers.length; i++) {
          tickerstock.child(snap.val().tickers[i]).once('value', function (stock) {
            ticker.push(stock.val().name)
            if (i === snap.val().tickers.length - 1) {
              let msg = 'Hasil Portofolio CheckUp ' + ticker.join(', ')
              Firebase.database().ref('users/' + uid).once('value', function (val) {
                let body = 'selamat ' + val.val().name + ' untuk Portofolio checkup saham berikut ini : ' + ticker.join(', ')
                if (typeof val.val().fcm !== 'undefined' && val.val().fcm !== '') {
                  let message = {
                    to: val.val().fcm,
                    notification: {
                      code: 'NA003',
                      title: msg,
                      body: body,
                      portofolio_key: snap.key
                    }
                  }
                  _this.fcm(message)
                }
                let notif = {code: 'NA003', created_at: new Date().getTime(), message: body, status: 'unread', title: msg, type: 'Portofolio', updated_at: new Date().getTime(), order: new Date().getTime() * -1, portofolio_key: snap.key}
                _this.saveNotif(uid, notif)
              })
            }
          })
        }
      }
    })
  },
  updateEventPaidByPayment (id, uid) {
    let _this = this
    let event = Firebase.database().ref().child('news')
    Firebase.database().ref('registerevent').orderByChild('payment_key').equalTo(id).on('child_added', function (snap) {
      if (typeof snap.val().event_key !== 'undefined') {
        event.child(snap.val().event_key).once('value', function (ev) {
          Firebase.database().ref('users/' + uid).once('value', function (val) {
            let evDate = _this.$moment(ev.val().event_date).format('DD MMM YYYY')
            let body = 'selamat ' + val.val().name + ' Pendaftaran anda sudah berhasil untuk acara : ' + ev.val().title + ' , Tanggal : ' + evDate + ', Tempat : ' + ev.val().place
            if (typeof val.val().fcm !== 'undefined' && val.val().fcm !== '' && val.val().notification_news === 'active') {
              let message = {
                to: val.val().fcm,
                notification: {
                  code: 'NA004',
                  title: 'Tiket Event ' + ev.val().title,
                  body: body
                }
              }
              _this.fcm(message)
            }
            let notif = {registerevent_key: snap.key, code: 'NA004', created_at: new Date().getTime(), message: body, status: 'unread', title: 'Tiket Event ' + ev.val().title, type: 'Event', updated_at: new Date().getTime(), order: new Date().getTime() * -1}
            _this.saveNotif(uid, notif)
          })
        })
      }
    })
  },
  notifPortofolioWithticker (id, uid) {
    let _this = this
    let tickerstock = Firebase.database().ref().child('stocks')
    let ticker = []
    Firebase.database().ref('portofolio_checkup/' + id).on('value', function (snap) {
      console.log(snap.val())
      if (typeof snap.val().tickers !== 'undefined' && snap.val().tickers.length > 0) {
        for (let i = 0; i < snap.val().tickers.length; i++) {
          tickerstock.child(snap.val().tickers[i]).once('value', function (stock) {
            ticker.push(stock.val().name)
            if (i === snap.val().tickers.length - 1) {
              let msg = 'Hasil Portofolio CheckUp ' + ticker.join(', ')
              Firebase.database().ref('users/' + uid).once('value', function (val) {
                let body = 'selamat ' + val.val().name + ' untuk Portofolio checkup saham berikut ini : ' + ticker.join(', ') + 'sudah berhasil diproses, silahkan klik button dibawah ini untuk melihat hasil checkup'
                let subBody = 'Congratulation Portofolio checkup berhasil di proses, klik untuk melihat'
                if (typeof val.val().fcm !== 'undefined' && val.val().fcm !== '') {
                  let message = {
                    to: val.val().fcm,
                    notification: {
                      code: 'NA003',
                      title: msg,
                      body: body,
                      subbody: subBody,
                      portofolio_key: id
                    }
                  }
                  _this.fcm(message)
                }
                let notif = {created_at: new Date().getTime(),
                  message: subBody,
                  status: 'unread',
                  title: msg,
                  type: 'Portofolio',
                  updated_at: new Date().getTime(),
                  order: new Date().getTime() * -1,
                  subbody: subBody,
                  portofolio_key: id,
                  code: 'NA003'
                }
                _this.saveNotif(uid, notif)
              })
            }
          })
        }
      }
    })
  }
}
