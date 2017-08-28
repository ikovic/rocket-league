import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCCYbRF5pQfi_-yegClzjv_EpKwBOzbn9w',
  authDomain: 'rocket-league-83d74.firebaseapp.com',
  databaseURL: 'https://rocket-league-83d74.firebaseio.com',
  projectId: 'rocket-league-83d74',
  storageBucket: '',
  messagingSenderId: '39553737397'
};

firebase.initializeApp(config);

export const addTeam = team => firebase.database().ref('teams/' + team.id).set(team);

export default firebase;
