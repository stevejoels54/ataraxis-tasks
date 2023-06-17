#!/usr/bin/env node

// This file contains functions to encrypt and decrypt messages using AES encryption.
// The sharedKey variable is the key used to encrypt and decrypt messages and is stored in the .env file.
// The encryptMessage function takes two parameters: message and key. The function encrypts the message using AES encryption and returns the encrypted message.
// The decryptMessage function takes two parameters: message and key. The function decrypts the message using AES decryption and returns the decrypted message.
// Author: Joel Steven Ssekyewa

const CryptoJS = require("crypto-js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Load environment variables from .env file

const sharedKey = process.env.SHARED_KEY;

// Encrypts a message using AES encryption
const encryptMessage = (message, key) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

// Decrypts a message using AES decryption
const decryptMessage = (message, key) => {
  return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
};

// Test the functions

const originalMessage = "This is a secret message";

const encryptedMessage = encryptMessage(originalMessage, sharedKey);
const decryptedMessage = decryptMessage(encryptedMessage, sharedKey);

console.log("Original message: ", originalMessage);
console.log("Encrypted message: ", encryptedMessage);
console.log("Decrypted message: ", decryptedMessage);

module.exports = { encryptMessage, decryptMessage, sharedKey };
