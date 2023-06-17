const {
  encryptMessage,
  decryptMessage,
  sharedKey,
} = require("../src/secureCommunicationChannels");

describe("Encryption and Decryption", () => {
  const originalMessage = "This is a secret message";

  test("Encrypts and decrypts a message", () => {
    const encryptedMessage = encryptMessage(originalMessage, sharedKey);
    const decryptedMessage = decryptMessage(encryptedMessage, sharedKey);

    expect(decryptedMessage).toEqual(originalMessage);
  });
});
