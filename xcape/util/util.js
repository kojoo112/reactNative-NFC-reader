import {firebase} from '@react-native-firebase/database';
import prompt from 'react-native-prompt-android';

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

function formatTimeString(time, showMsecs) {
  let status;
  if (time < 0) {
    time = Math.abs(time);
    status = 'increase';
  }
  let msecs = time % 1000;

  if (msecs < 10) {
    msecs = `00${msecs}`;
  } else if (msecs < 100) {
    msecs = `0${msecs}`;
  }

  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(time / 60000);
  let hours = Math.floor(time / 3600000);
  seconds = seconds - minutes * 60;
  // minutes = minutes - hours * 60;

  if (status === 'increase') {
    return `+ ${minutes < 10 ? 0 : ''}${minutes}:${
      seconds < 10 ? 0 : ''
    }${seconds}:${msecs}`;
  }

  return `${minutes < 10 ? 0 : ''}${minutes}:${
    seconds < 10 ? 0 : ''
  }${seconds}:${msecs}`;
}

export const customPrompt = (title, message, okOnPress) => {
  prompt(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: password => {
          if (password === '5772') {
            okOnPress();
          }
        },
      },
    ],
    {
      type: 'numeric',
      cancelable: false,
      placeholder: '비밀번호 입력...',
    },
  );
};

export {formatTimeString};
