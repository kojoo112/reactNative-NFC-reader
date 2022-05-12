import {firebase} from '@react-native-firebase/database';

export async function getData(ref, isReturnKeys = true) {
  try {
    const snapshot = await firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(ref)
      .once('value');
    if (isReturnKeys) {
      return snapshot.val();
    } else {
      return Object.keys(snapshot.val()).sort();
    }
  } catch (e) {
    console.log('>>> Util.js >>> getData() : ', e);
  }
}
