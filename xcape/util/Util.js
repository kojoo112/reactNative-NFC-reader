import {firebase} from '@react-native-firebase/database';

export async function getData(ref, setState) {
  try {
    await firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(ref)
      .once('value')
      .then(snapshot => {
        console.log('set state', setState);
        if (setState !== undefined) {
          setState(snapshot.val());
        } else {
          return Object.keys(snapshot.val());
        }
      });
  } catch (e) {
    console.log('asdfasdf', e);
  }
}
