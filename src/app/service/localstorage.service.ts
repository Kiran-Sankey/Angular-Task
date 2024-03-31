import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  secretKey: string = '33kiruu_#shinde16@86';

  constructor() { }

  storeEncryptedUserData(data: { name: string, email: string, password: string }) {
    // Encrypt each field of the data object
    const encryptedData = {
      name: this.encryptData(data.name),
      email: this.encryptData(data.email),
      password: this.encryptData(data.password)
    };

    console.log("encrypted user is : ", encryptedData);

    const getCurrent: any = localStorage.getItem('encryptedUserData');
    let newUser = JSON.parse(getCurrent);

    if (newUser != null) {
      newUser.push(encryptedData);
      // Store the encrypted data in local storage
      localStorage.setItem('encryptedUserData', JSON.stringify(newUser));
    }
    else {
      localStorage.setItem('encryptedUserData', JSON.stringify(encryptedData));
    }
  }

  getDecryptedUserData(): { name: string, email: string, password: string } | null {
    const encryptedDataString = localStorage.getItem('encryptedUserData');


    console.log("Data in localstorage is : ", encryptedDataString);

    if (encryptedDataString) {
      // Decrypt each field of the encrypted data object
      const encryptedData = JSON.parse(encryptedDataString);

      return {
        name: this.decryptData(encryptedData.name),
        email: this.decryptData(encryptedData.email),
        password: this.decryptData(encryptedData.password)
      };
    } else {
      return null;
    }
  }

  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  private decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
