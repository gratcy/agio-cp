import Firebase from 'firebase'
export default {
  saveInfo (value) {
    Firebase.database().ref('settings').update({info: value})
  },
  saveprice (value) {
    Firebase.database().ref('settings/membership').update({premium: value})
  }
}
