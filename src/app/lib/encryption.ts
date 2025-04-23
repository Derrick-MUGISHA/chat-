/**
 * Encryption utilities for end-to-end encryption
 * Using Web Crypto API for secure encryption/decryption
 */

// Generate a new key pair for a user
export async function generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"],
    )
  
    // Export the public key
    const publicKeyBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey)
    const publicKey = arrayBufferToBase64(publicKeyBuffer)
  
    // Export the private key
    const privateKeyBuffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
    const privateKey = arrayBufferToBase64(privateKeyBuffer)
  
    return { publicKey, privateKey }
  }
  
  // Encrypt a message with the recipient's public key
  export async function encryptMessage(message: string, publicKeyString: string): Promise<string> {
    // Import the public key
    const publicKeyBuffer = base64ToArrayBuffer(publicKeyString)
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["encrypt"],
    )
  
    // Generate a random AES key
    const aesKey = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    )
  
    // Encrypt the message with the AES key
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const messageBuffer = new TextEncoder().encode(message)
    const encryptedMessageBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      aesKey,
      messageBuffer,
    )
  
    // Export the AES key
    const aesKeyBuffer = await window.crypto.subtle.exportKey("raw", aesKey)
  
    // Encrypt the AES key with the recipient's public key
    const encryptedAesKeyBuffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      aesKeyBuffer,
    )
  
    // Combine the encrypted AES key, IV, and encrypted message
    const result = {
      encryptedKey: arrayBufferToBase64(encryptedAesKeyBuffer),
      iv: arrayBufferToBase64(iv),
      encryptedMessage: arrayBufferToBase64(encryptedMessageBuffer),
    }
  
    return JSON.stringify(result)
  }
  
  // Decrypt a message with the user's private key
  export async function decryptMessage(encryptedData: string, privateKeyString: string): Promise<string> {
    const { encryptedKey, iv, encryptedMessage } = JSON.parse(encryptedData)
  
    // Import the private key
    const privateKeyBuffer = base64ToArrayBuffer(privateKeyString)
    const privateKey = await window.crypto.subtle.importKey(
      "pkcs8",
      privateKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["decrypt"],
    )
  
    // Decrypt the AES key
    const encryptedAesKeyBuffer = base64ToArrayBuffer(encryptedKey)
    const aesKeyBuffer = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey,
      encryptedAesKeyBuffer,
    )
  
    // Import the AES key for decryption
    const aesKey = await window.crypto.subtle.importKey(
      "raw",
      aesKeyBuffer,
      {
        name: "AES-GCM",
      },
      false,
      ["decrypt"],
    )
  
    // Decrypt the message using the AES key and IV
    const decryptedMessageBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToArrayBuffer(iv),
      },
      aesKey,
      base64ToArrayBuffer(encryptedMessage),
    )
  
    // Convert the decrypted message back to a string
    const decodedMessage = new TextDecoder().decode(decryptedMessageBuffer)
  
    return decodedMessage
  }
  