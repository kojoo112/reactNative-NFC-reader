import AsyncStorage from '@react-native-async-storage/async-storage';

// 스토리지에 테마 이름 저장
export const storeSetThemeName = async getThemeName => {
  const themeName = JSON.stringify(await getThemeName());
  try {
    await AsyncStorage.setItem('themeName', themeName);
  } catch (e) {
    console.error(e);
  }
};
// 스토리지에서 테마 이름 가져오기 (기존 : getThemeName)
export const storeGetThemeName = async setThemeName => {
  try {
    const themeName = await AsyncStorage.getItem('themeName');
    if (themeName !== null) {
      setThemeName(JSON.parse(themeName));
    }
  } catch (e) {
    console.error(e);
  }
};

// 스토리지에 힌트 리스트 저장 (기존 : storeHintList)
export const storeSetHintList = async getHintList => {
  // isSearch 추가
  const hintList = JSON.stringify(await getHintList());
  try {
    await AsyncStorage.setItem('hintList', hintList);
  } catch (e) {
    console.error(e);
  }
};
// 스토리지에서 힌트 리스트 가져오기 (기존 : getHintList)
export const storeGetHintList = async setHintList => {
  try {
    const hintList = await AsyncStorage.getItem('hintList');
    if (hintList !== null) {
      setHintList(JSON.parse(hintList));
    }
  } catch (e) {
    console.error(e);
  }
};

// 스토리지에 힌트 카운트 저장 (기존 : storeHintCount)
export const storeSetHintCount = async hintCount => {
  await AsyncStorage.setItem('hintCount', JSON.stringify(hintCount + 1));
};
// 스토리지에서 힌트 카운트 가져오기 (기존 : getHintCount)
export const storeGetHintCount = async setHintCount => {
  try {
    const hintCount = JSON.parse(await AsyncStorage.getItem('hintCount'));
    if (hintCount) setHintCount(hintCount);
    else setHintCount(0);
  } catch (e) {
    console.error(e);
  }
};

// 스토리지에 사용한 힌트 리스트 저장 (기존 : storeUseHintList)
export const storeSetUseHintList = async (useHintList, hintKey) => {
  const newHintList = {...useHintList, hintKey};
  await AsyncStorage.setItem('useHintList', JSON.stringify(newHintList));
};
// 스토리지에서 사용한 힌트 리스트 가져오기 (기존 : getUseHintList)
export const storeGetUseHintList = async setUseHintList => {
  try {
    const useHintList = await AsyncStorage.getItem('useHintList');
    if (useHintList !== null) {
      const getuseHintList = Object.values(JSON.parse(useHintList));
      setUseHintList(getuseHintList);
    } else {
      setUseHintList([]);
    }
  } catch (e) {
    console.error(e);
  }
};

// 스토리지 힌트 카운트 초기화
export const storeInitHintCount = async () => {
  try {
    await AsyncStorage.setItem('hintCount', '0');
  } catch (e) {
    console.error(e);
  }
};
// 스토리지 사용한 힌트 리스트 초기화
export const storeInitUseHintList = async () => {
  try {
    await AsyncStorage.setItem('useHintList', '');
  } catch (e) {
    console.error(e);
  }
};
