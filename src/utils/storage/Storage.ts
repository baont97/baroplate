import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'BAROPLATE',
});

export enum storageKeys {
  token = 'TOKEN',
}
