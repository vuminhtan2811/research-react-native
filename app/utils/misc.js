export const firebaseConfig = {
  apiKey: 'AIzaSyCPMsg6sb5JGUt2VrBbUtZW0S_J-8ACIWU',
  authDomain: 'rn-nba-app-3735c.firebaseapp.com',
  databaseURL: 'https://rn-nba-app-3735c.firebaseio.com',
  projectId: 'rn-nba-app-3735c',
  storageBucket: 'rn-nba-app-3735c.appspot.com',
  messagingSenderId: '722173738809',
  appId: '1:722173738809:web:d1605bd97a188023e9b2e8',
  measurementId: 'G-D5T9C49W7X',
};

export const FIREBASEURL = firebaseConfig.databaseURL;

export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}
`;

export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}
`;

export const AUTOSIGNIN = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`;

export const convertFirebase = data => {
  let newData = [];
  for (let key in data) {
    newData.push({
      ...data[key],
      id: key,
    });
  }
  return newData;
};

export const findTeamData = (id, teams) => {
  let value = teams.find(team => (team.id = id));
  return value;
};
