import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  static async set(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  static async get(key: string) {
    return AsyncStorage.getItem(key);
  }

  static async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }
}

export default LocalStorage;
