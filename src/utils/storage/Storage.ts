import { MMKV } from "react-native-mmkv";
import RNSecureStorage from "react-native-encrypted-storage";

export const storage = new MMKV({
  id: "BAROPLATE",
});

export const secureStorage = RNSecureStorage;

export enum storageKeys {
  token = "TOKEN",
}
