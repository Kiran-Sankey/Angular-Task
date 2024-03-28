import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  storeEncryptedUserData(data: { name: string, email: string, password: string }) {
    // Encrypt each field of the data object
    const encryptedData = {
      name: this.encryptData(data.name),
      email: this.encryptData(data.email),
      password: this.encryptData(data.password)
    };

    // Store the encrypted data in local storage
    localStorage.setItem('encryptedUserData', JSON.stringify(encryptedData));

    // const currentUser = localStorage.getItem('encryptedUserData');

    // if (currentUser != null) {
    //   const users = JSON.parse(currentUser);
    //   users.push(encryptedData);
    //   console.log('new user is : ', users);
    // }
    // else {
    //   const user = [];
    //   user.push(encryptedData);
    //   localStorage.setItem('encryptedUserData', JSON.stringify(user));
    // }
  }

  getDecryptedUserData(): { name: string, email: string, password: string } | null {
    // Retrieve encrypted data from local storage
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
    // Replace 'YourSecretKey' with your actual secret key
    const secretKey = '33kiruu_#shinde16@86';
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  private decryptData(encryptedData: string): string {
    // Replace 'YourSecretKey' with your actual secret key
    const secretKey = '33kiruu_#shinde16@86';
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
