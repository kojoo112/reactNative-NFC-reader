import {firebase} from '@react-native-firebase/database';

export async function getData(ref, setState, isReturnKeys = true) {
  try {
    await firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(ref)
      .once('value')
      .then(snapshot => {
        if (isReturnKeys) {
          setState(snapshot.val());
        } else {
          setState(Object.keys(snapshot.val()).sort());
        }
      });
  } catch (e) {
    console.log('>>> Util.js >>> getData() : ', e);
  }
}
